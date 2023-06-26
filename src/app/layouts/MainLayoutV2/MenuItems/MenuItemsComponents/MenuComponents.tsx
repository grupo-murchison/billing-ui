import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography } from '@mui/material';
import { IMenuItem } from '../menu-items.interface';

// import { themeTypography } from "theme/typography";

export function IconRender({
	icon,
	level = 0,
	isActive,
	item,
}: {
	icon?: any;
	level?: number;
	isActive?: string[];
	item?: IMenuItem;
}) {
	const Icon = icon;

	const iconRender = icon ? (
		<Icon sx={{ color: 'white' }} />
	) : (
		<FiberManualRecordIcon
			sx={{
				color: 'white',
				// display: 'none',
				width:
					isActive && isActive.findIndex((id: any) => id === item?.id) > -1
						? 10
						: 6,
				height:
					isActive && isActive.findIndex((id: any) => id === item?.id) > -1
						? 10
						: 6,
				// color: isActive.findIndex((id: any) => id === item?.id) > -1 ? 'whitesmoke' : 'inherit'
			}}
			fontSize={level > 0 ? 'inherit' : 'medium'}
		/>
	);

	return <>{iconRender}</>;
}

export function ListSubHeader({
	title,
	caption,
}: {
	title: string;
	caption?: string;
}) {
	return (
		<Typography
			variant="caption"
			sx={
				{
					// ...theme.typography.menuCaption
					// ...themeTypography.menuCaption,
				}
			}
			display="block"
			gutterBottom
		>
			{title}
			{caption && <MenuItemCaption caption={caption} />}
		</Typography>
	);
}

export function MenuItemCaption({ caption }: { caption: string }) {
	return (
		<Typography
			variant="caption"
			sx={
				{
					// ...theme.typography.subMenuCaption
					// ...themeTypography.subMenuCaption,
				}
			}
			display="block"
			gutterBottom
		>
			{caption}
		</Typography>
	);
}

export function MenuItemError({
	key,
	message,
}: {
	key: string | number;
	message?: string;
}) {
	return (
		<Typography key={key} variant="h6" color="error" align="center">
			{message ? message : 'Menu Item Error'}
		</Typography>
	);
}
