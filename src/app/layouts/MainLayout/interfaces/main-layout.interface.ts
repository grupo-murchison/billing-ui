export type ItemProps = {
    title: string;
    icon: JSX.Element;
    items: {
      label: string;
      path: string;
    }[];
  };