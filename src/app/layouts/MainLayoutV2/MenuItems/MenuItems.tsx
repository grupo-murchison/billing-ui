import { IMenuItemsGroup } from './menu-items.interface';

import { MenuItemError } from './MenuItemsComponents/MenuComponents';
import MenuItemGroup from './MenuItemsComponents/MenuItemGroup';

export function MenuItemsNestedList({
	menuItem,
	open,
}: {
	menuItem: IMenuItemsGroup;
	open: boolean;
}) {
	const navItems = menuItem.items.map((item) => {
		switch (item.type) {
			case 'group':
				return <MenuItemGroup key={item.id} item={item} open={open} />;
			default:
				return (
					<MenuItemError
						key={item.id}
						message='Menu Items must be "group" type'
					/>
				);
		}
	});

	return <>{navItems}</>;
}
