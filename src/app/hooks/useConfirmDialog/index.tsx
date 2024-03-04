import { useCallback, useContext } from 'react';

import { ConfirmDialog } from '@app/components/ConfirmDialog';
import { ComponentInjectorContext } from '@app/contexts';
import { ConfirmDialogType } from '@app/components/ConfirmDialog/ConfirmDialog';

const useConfirmDialog = () => {
  const { setDialogNode } = useContext(ComponentInjectorContext);

  const destroyDialog = useCallback(() => {
    setDialogNode(undefined);
  }, []);

  const openDialog: OpenDialog = useCallback(
    ({ message, title, identifier, entity, onClickNot, onClickYes, type }) => {
      setDialogNode(
        <ConfirmDialog
          title={title}
          message={message}
          identifier={identifier}
          entity={entity}
          onClickYes={onClickYes}
          onClickNot={onClickNot || destroyDialog}
          onClose={destroyDialog}
          type={type}
        />,
      );
    },
    [destroyDialog],
  );

  return { open: openDialog, close: destroyDialog };
};

type OpenDialog = (params: {
  type: ConfirmDialogType;
  message?: string;
  title?: string;
  identifier?: string;
  entity?: string;
  onClickYes: () => void | Promise<void>;
  onClickNot?: () => void;
}) => void;

export default useConfirmDialog;
