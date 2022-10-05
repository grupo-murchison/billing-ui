import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { withPortal } from '@app/hocs';

import { ClassNameHandlerLib } from '@libs';

import './Modal.scss';

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const className = useMemo(() => {
    return ClassNameHandlerLib.merge('modal', {
      'modal--open': isOpen,
    });
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={className}>
      <div className='modal-content'>
        <div className='modal-content__header'>
          <h1 className='mch__title'>{title}</h1>
          <span className='mch__closeButton' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-content__body'>{children}</div>
      </div>
    </div>
  );
};

type ModalProps = {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
};

export default withPortal(Modal, 'modal-root');
