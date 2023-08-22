import { SvgIconComponent } from '@mui/icons-material';

type TMenuItem = 'collapse' | 'group' | 'item' | 'none';

interface IMenuItemBase {
  id: string;
  disabled?: boolean;
  title?: string;
  type: TMenuItem;
}

export interface IMenuItem extends IMenuItemBase {
  breadcrumbs?: boolean;
  icon?: SvgIconComponent;
  url?: string;
  // Especiales
  target?: boolean; // atributo html <a> para abrir en nueva ventana
  external?: boolean; // si es un enlace a un sitio externo
}

export interface IMenuItemCollapse extends IMenuItemBase {
  children: IMenuItem[];
  icon: SvgIconComponent;
}

export interface IMenuItemGroup extends IMenuItemBase {
  caption?: string;
  children: IMenuItem[] | IMenuItemCollapse[];
}

export type TIconRender = {
  icon?: SvgIconComponent;
  level?: number;
  isSelected?: boolean;
};
