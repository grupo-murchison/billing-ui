import { Divider, List } from '@mui/material';
import MenuItemCollapse from './MenuItemCollapse';
import MenuItem from './MenuItem';
import { MenuItemError, ListSubHeader } from './MenuComponents';
import { IMenuItemGroup } from '../menu-items.interface';

const MenuItemGroup = ({ item }: Props): JSX.Element => {
  // menu list collapse & items
  const items = item.children?.map(menu => {
    switch (menu.type) {
      case 'collapse':
        return <MenuItemCollapse key={menu.id} menuItem={menu} level={1} />;
      case 'item':
        return <MenuItem key={menu.id} menuItem={menu} level={1} />;
      default:
        return <MenuItemError key={menu.id} message='Menu Items must be "item" or "collapse" type' />;
    }
  });

  return (
    <>
      <List
        sx={{
          width: '100%',
          padding: 0,
        }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={item.title && <ListSubHeader title={item.title} caption={item.caption || ''} />}
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

type Props = {
  item: IMenuItemGroup;
};

export default MenuItemGroup;
