type TMenuItem = 'collapse' | 'group' | 'item' | 'none';

export interface IMenuItem {
  id: string | number;
  breadcrumbs?: boolean;
  caption?: string;
  children?: IMenuItem[];
  disabled?: boolean;
  icon?: any;
  url?: string;
  title?: string;
  type: TMenuItem;
  // Especiales
  external?: boolean; // si es un enlace a un sitio externo
  target?: boolean; // atributo html <a> para abrir en nueva ventana
}

export interface IMenuItemsGroup {
  items: IMenuItem[];
}
