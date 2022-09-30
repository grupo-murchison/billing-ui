import { useMemo } from 'react';

import { ClassNameHandlerLib } from '@libs';

import './Portlet.scss';

const Portlet = ({ className: classNameProp, ...props }: PortletProps) => {
  const className = useMemo(() => {
    return ClassNameHandlerLib.merge('portlet', classNameProp);
  }, [classNameProp]);

  return <div className={className} {...props} />;
};

type PortletProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default Portlet;
