import { useState } from 'react';

const useModalState = ({ initialOpen }: UseModalStateProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return { onOpen, onClose, isOpen, onToggle };
};

type UseModalStateProps = {
  initialOpen?: boolean;
};

export default useModalState;
