/**
 * Wrapper around @docusaurus/theme-classic's DropdownNavbarItem.
 *
 * The stock dropdown only marks its top-level label active when one of its
 * children has a matching `to` / `activeBasePath` / `activeBaseRegex`. Every
 * navbar child here is a `{type: 'doc', docId}` item, which has none of those,
 * so no section label ever highlighted. Resolve the child doc IDs to their
 * paths and light up the label for the section the current page lives in.
 */
import React from 'react';
import clsx from 'clsx';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import {isRegexpStringMatch} from '@docusaurus/theme-common';
import {isSamePath, useLocalPathname} from '@docusaurus/theme-common/internal';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

function isItemActive(item, localPathname, docPaths) {
  if (item.type === 'doc' && item.docId) {
    return isSamePath(docPaths.get(item.docId), localPathname);
  }
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  return !!item.activeBasePath && localPathname.startsWith(item.activeBasePath);
}

export default function DropdownNavbarItemWrapper({
  mobile = false,
  items = [],
  className,
  ...props
}) {
  const localPathname = useLocalPathname();
  const {activeVersion} = useActiveDocContext(props.docsPluginId);
  const docPaths = React.useMemo(
    () => new Map((activeVersion?.docs ?? []).map((doc) => [doc.id, doc.path])),
    [activeVersion],
  );
  // Mobile already signals the current section by auto-expanding it.
  const containsActive =
    !mobile &&
    items.some((item) => isItemActive(item, localPathname, docPaths));

  return (
    <DropdownNavbarItem
      mobile={mobile}
      items={items}
      className={clsx(className, containsActive && 'navbar__link--active')}
      {...props}
    />
  );
}
