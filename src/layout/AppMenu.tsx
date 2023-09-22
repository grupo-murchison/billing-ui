import { IMenuItemGroup } from './interfaces/menu-items.interface';

import { MenuItemError } from './MenuItems/components';
import MenuItemGroup from './MenuItems/MenuItemGroup';

function MenuItemsNestedList({ menuItems }: { menuItems: IMenuItemGroup[] }) {
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

export default MenuItemsNestedList;
