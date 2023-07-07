import { IMenuItemGroup } from './menu-items.interface';

import { MenuItemError } from './MenuItemsComponents/MenuComponents';
import MenuItemGroup from './MenuItemsComponents/MenuItemGroup';

export function MenuItemsNestedList({ menuItems, open }: { menuItems: IMenuItemGroup[]; open: boolean }) {
  const navItems = menuItems.map(itemGroup => {
    switch (itemGroup.type) {
      case 'group':
        return <MenuItemGroup key={itemGroup.id} item={itemGroup} open={open} />;
      default:
        return <MenuItemError key={itemGroup.id} message='Menu Items must be "group" type' />;
    }
  });

  return <>{navItems}</>;
}
