import { useState } from 'react';
import {
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import { IconRender } from './MenuComponents';
import ContextualMenu from './ContextualMenu';
import { IMenuItem, IMenuItemCollapse } from '../menu-items.interface';

function MenuItemCollapse({
	menuItem,
	level,
	open,
}: {
	menuItem?: IMenuItemCollapse;
	level?: number;
	open: boolean;
}) {
	const [expand, setExpand] = useState(false);

	const handleClick = () => {
		setExpand(!expand);
	};

	return (
		<ListItem disablePadding sx={{ display: 'block' }}>
			{open ? (
				<>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<IconRender
								icon={menuItem?.icon || InboxIcon}
								level={level}
								item={menuItem}
							/>
						</ListItemIcon>
						<ListItemText primary={menuItem?.title} />
						{expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListItemButton>

					<Collapse in={expand} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{menuItem?.children?.map((item) => (
								<MenuItem key={item.id} menuItem={item} level={1} open={open} />
							))}
						</List>
					</Collapse>
				</>
			) : (
				<ContextualMenu menuItem={menuItem} />
			)}
		</ListItem>
	);
}

export default MenuItemCollapse;
