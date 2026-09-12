---
sidebar_position: 5
---

# Kubernetes and k3s

The `multi` branch deploys current Resgrid Core services with Kustomize through `kubectl apply -k`. It does not require Helm.

The base creates:

- Web, API, events, worker/migrations, TTS, and MCP Deployments.
- PostgreSQL, Redis, RabbitMQ, and RustFS single-replica StatefulSets with persistent volume claims.
- A RustFS bucket initialization Job.
- A standard Kubernetes Ingress for the web, API/TTS, and events hostnames.
- A generated Secret containing the complete Resgrid environment.

Optional manifests add tracker-gateway and inbound-email relay workloads.

:::warning Availability
The included StatefulSets are single replicas and are not an HA data tier. For production, use managed/clustered dependencies, image digests, resource policies, monitoring, network policies, and storage-provider backups appropriate to the workload.
:::

## Architecture requirement

Current Resgrid application images are published for `linux/amd64` only. Application Deployments select nodes labeled `kubernetes.io/arch=amd64`. Infrastructure can run on supported ARM64 nodes, so a mixed cluster works, but a pure Raspberry Pi/ARM64 k3s cluster cannot run the application pods natively today.

`setup.sh` refuses to apply when the cluster has no registered AMD64 node. Do not remove the node selector unless you publish and validate native ARM64 images or deliberately provide a supported emulation runtime.

## Requirements

- Kubernetes 1.27+ or a current k3s release.
- At least one AMD64 worker.
- A default `ReadWriteOnce` StorageClass (`local-path` is the k3s default).
- An IngressClass (`traefik` is the k3s default).
- `kubectl`, OpenSSL, and a configured kube context.
- Three DNS names pointing to the ingress address.
- Registry credentials if `dhi.io` requires authentication for your environment.

Verify before installing:

```bash
kubectl config current-context
kubectl get nodes -L kubernetes.io/arch
kubectl get storageclass
kubectl get ingressclass
```

## Configure and apply

```bash
git clone --branch multi https://github.com/Resgrid/resgrid-setup.git resgrid-k8s
cd resgrid-k8s
chmod +x setup.sh
./setup.sh
```

Setup asks for the three hostnames, IngressClass, and pod CIDR. It generates infrastructure credentials, Resgrid keys, OpenIddict certificates, ingress TLS files, and ignored host-specific inputs under `deploy/generated`. It displays the active kube context and requires confirmation before applying.

Generate without changing the cluster:

```bash
RESGRID_NO_APPLY=1 ./setup.sh
kubectl kustomize deploy >/dev/null
```

Non-interactive install using an existing TLS certificate:

```bash
RESGRID_WEB_URL=dispatch.example.com \
RESGRID_API_URL=dispatchapi.example.com \
RESGRID_EVENTS_URL=dispatchevents.example.com \
RESGRID_INGRESS_CLASS=nginx \
RESGRID_POD_CIDR=10.244.0.0/16 \
RESGRID_TLS_CERT_FILE=/secure/fullchain.pem \
RESGRID_TLS_KEY_FILE=/secure/privkey.pem \
RESGRID_APPLY=1 \
./setup.sh
```

Without supplied TLS files, setup generates a self-signed certificate containing all three hostnames. Distribute/trust `deploy/generated/tls.crt` on clients.

The pod CIDR configures which ingress-to-pod forwarded headers Resgrid trusts. k3s commonly uses `10.42.0.0/16`; inspect your CNI and supply its actual network for other distributions.

## Registry login

If image pulls from `dhi.io` require authentication:

```bash
kubectl -n resgrid create secret docker-registry dhi-registry \
  --docker-server=dhi.io \
  --docker-username='YOUR_USER' \
  --docker-password='YOUR_TOKEN'
kubectl -n resgrid patch serviceaccount default \
  -p '{"imagePullSecrets":[{"name":"dhi-registry"}]}'
```

Use a service/robot token and keep it out of Git.

## Verify first start

```bash
kubectl -n resgrid get pods -w
kubectl -n resgrid logs -f deployment/worker
kubectl -n resgrid get ingress
kubectl -n resgrid get pvc
```

The worker creates/migrates the main, OIDC, worker, and document PostgreSQL databases. After migrations settle, open the web hostname and use **Sign Up**.

## Optional services

Tracker gateway: update `RESGRID__UnitTrackingConfig__*` in `deploy/generated/resgrid.env`, re-apply the generated Secret/base, then create its workload:

```bash
kubectl apply -k deploy
kubectl apply -f deploy/optional/tracking.yaml
kubectl -n resgrid get service tracker-gateway
```

The LoadBalancer Service publishes tracker TCP/UDP ports. k3s ServiceLB and cloud providers advertise them differently; verify the assigned address and firewall exposure.

Email relay: update its department/domain settings, re-apply, then:

```bash
kubectl apply -k deploy
kubectl apply -f deploy/optional/relay.yaml
kubectl -n resgrid get service relay
```

The relay publishes SMTP port 25 without SMTP authentication or TLS. Place it behind a filtering MTA or strict firewall.

## Scaling and customization

Scale stateless services after validating dependency capacity:

```bash
kubectl -n resgrid scale deployment/web deployment/api deployment/events --replicas=2
```

Use a Kustomize overlay for image digests, storage sizes/classes, resources, topology constraints, probes, or external data services. Keep generated secrets out of overlays and Git.

MCP is a ClusterIP-only Service because its HTTP transport is unauthenticated. Add an authenticated ingress only if your security design explicitly protects it.

## Backup and rollback

Create a PostgreSQL dump:

```bash
kubectl -n resgrid exec statefulset/postgres -- \
  pg_dumpall -U resgrid > "resgrid-$(date +%F).sql"
```

Back up `deploy/generated/resgrid.env`, ingress TLS material, and RustFS/PostgreSQL PVCs using your storage provider's consistent snapshot/backup system.

Before upgrading, record image digests and render the candidate with `kubectl kustomize deploy`. Apply with `kubectl apply -k deploy`, then follow worker migrations and rollouts.

Application rollback does not reverse database migrations. Retain previous manifests/digests plus a compatible pre-upgrade database backup. Restore data and the matching generated Secret before reapplying older workloads when schema compatibility requires it.

`kubectl delete -k deploy` removes the namespace workloads and generated resources; StatefulSet/PVC retention behavior varies. Inventory and back up PVCs before any uninstall.
