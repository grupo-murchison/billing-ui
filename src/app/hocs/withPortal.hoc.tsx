import ReactDOM from 'react-dom';

import type { ComponentType } from 'react';

const withPortal = <TProps,>(Component: ComponentType<TProps & JSX.IntrinsicAttributes>, nodeId: string) => {
  return (props: TProps & JSX.IntrinsicAttributes) => {
    const portalNode = document.getElementById(nodeId);

    if (!portalNode) {
      return null;
    }

    return ReactDOM.createPortal(<Component {...props} />, portalNode);
  };
};

export default withPortal;
