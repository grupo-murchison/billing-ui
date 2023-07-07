type TMenuItem = 'collapse' | 'group' | 'item' | 'none';

export interface IMenuItem {
  id: string | number;
  breadcrumbs?: boolean;
  icon?: any;
  disabled?: boolean;
  url?: string;
  title?: string;
  type: TMenuItem;
  // Especiales
  target?: boolean; // atributo html <a> para abrir en nueva ventana
  external?: boolean; // si es un enlace a un sitio externo
}

export interface IMenuItemCollapse {
  id: string | number;
  icon?: any;
  children: IMenuItem[];
  disabled?: boolean;
  title?: string;
  type: TMenuItem;
}

export interface IMenuItemGroup {
  id: string | number;
  caption?: string;
  children: IMenuItem[] | IMenuItemCollapse[];
  disabled?: boolean;
  title?: string;
  type: TMenuItem;
}
