import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { ClassNameHandlerLib } from '@libs';

import './Portlet.scss';

const Portlet = ({ className: classNameProp, children }: PortletProps) => {
  const className = useMemo(() => {
    return ClassNameHandlerLib.merge('portlet', classNameProp);
  }, [classNameProp]);

  return <div className={className}>{children}</div>;
};

type PortletProps = {
  children?: ReactNode;
  className?: string;
};

export default Portlet;
