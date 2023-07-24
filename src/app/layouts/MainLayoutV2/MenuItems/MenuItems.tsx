import { IMenuItemGroup } from './menu-items.interface';

import { MenuItemError } from './MenuItemsComponents/MenuComponents';
import MenuItemGroup from './MenuItemsComponents/MenuItemGroup';

export function MenuItemsNestedList({ menuItems }: { menuItems: IMenuItemGroup[] }) {
  const navItems = menuItems.map(itemGroup => {
    switch (itemGroup.type) {
      case 'group':
        return <MenuItemGroup key={itemGroup.id} item={itemGroup} />;
      default:
        return <MenuItemError key={itemGroup.id} message='Menu Items must be "group" type' />;
    }
  });

  return <>{navItems}</>;
}
