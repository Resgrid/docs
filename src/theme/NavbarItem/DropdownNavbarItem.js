/**
 * Wrapper around @docusaurus/theme-classic's DropdownNavbarItem.
 *
 * The stock dropdown only marks its top-level label active when one of its
 * children has a matching `to` / `activeBasePath` / `activeBaseRegex`. Every
 * navbar child here is a `{type: 'doc', docId}` item, which has none of those,
 * so no section label ever highlighted.
 *
 * This wrapper scores every navbar dropdown against the current path and
 * highlights the single best match:
 *   1. a child pointing at the current page wins outright;
 *   2. otherwise the child whose own directory is the longest prefix of the
 *      current path wins, so pages that are not listed in any dropdown (say
 *      /web-app/records/hydrants) still light up their section;
 *   3. ties (several dropdowns share a directory, e.g. /web-app/) go to the
 *      dropdown with the most children in that directory, then to the one
 *      declared first in the navbar.
 * Scoring spans all dropdowns, not just this one, so at most one label is ever
 * active.
 */
import React from 'react';
import clsx from 'clsx';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import {isRegexpStringMatch, useThemeConfig} from '@docusaurus/theme-common';
import {isSamePath, useLocalPathname} from '@docusaurus/theme-common/internal';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

const EXACT = Number.MAX_SAFE_INTEGER;

function stripTrailingSlash(path) {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** Directory holding `path`: /web-app/records/overview -> /web-app/records */
function dirname(path) {
  const cut = stripTrailingSlash(path).lastIndexOf('/');
  return cut > 0 ? path.slice(0, cut) : '';
}

/** How well a single navbar child matches the current path; 0 = not at all. */
function itemScore(item, pathname, docPaths) {
  const target =
    item.type === 'doc' && item.docId ? docPaths.get(item.docId) : item.to;

  if (
    (item.activeBaseRegex &&
      isRegexpStringMatch(item.activeBaseRegex, pathname)) ||
    (item.activeBasePath && pathname.startsWith(item.activeBasePath))
  ) {
    return EXACT;
  }
  if (!target) {
    return 0;
  }
  if (isSamePath(target, pathname)) {
    return EXACT;
  }
  const dir = dirname(target);
  if (dir && (pathname === dir || pathname.startsWith(`${dir}/`))) {
    return dir.length;
  }
  return 0;
}

/** Best score for a dropdown, plus how many children reached it. */
function dropdownScore(items, pathname, docPaths) {
  let score = 0;
  let count = 0;
  items.forEach((item) => {
    const itemResult = itemScore(item, pathname, docPaths);
    if (itemResult > score) {
      score = itemResult;
      count = 1;
    } else if (itemResult === score && score > 0) {
      count += 1;
    }
  });
  return {score, count};
}

export default function DropdownNavbarItemWrapper({
  mobile = false,
  items = [],
  className,
  ...props
}) {
  const localPathname = stripTrailingSlash(useLocalPathname());
  const {activeVersion} = useActiveDocContext(props.docsPluginId);
  const {
    navbar: {items: navbarItems},
  } = useThemeConfig();

  const docPaths = React.useMemo(
    () => new Map((activeVersion?.docs ?? []).map((doc) => [doc.id, doc.path])),
    [activeVersion],
  );

  const winnerLabel = React.useMemo(() => {
    let best = null;
    navbarItems.forEach((navbarItem) => {
      if (navbarItem.type !== 'dropdown' || !navbarItem.items) {
        return;
      }
      const {score, count} = dropdownScore(
        navbarItem.items,
        localPathname,
        docPaths,
      );
      if (score === 0) {
        return;
      }
      // Declared first wins a dead heat: only a strictly better score, or the
      // same score backed by more children, replaces the current leader.
      if (
        !best ||
        score > best.score ||
        (score === best.score && count > best.count)
      ) {
        best = {label: navbarItem.label, score, count};
      }
    });
    return best?.label;
  }, [navbarItems, localPathname, docPaths]);

  // Mobile already signals the current section by auto-expanding it.
  const containsActive =
    !mobile && winnerLabel !== undefined && winnerLabel === props.label;

  return (
    <DropdownNavbarItem
      mobile={mobile}
      items={items}
      className={clsx(className, containsActive && 'navbar__link--active')}
      {...props}
    />
  );
}
