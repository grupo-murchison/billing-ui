import { useCallback, useContext } from 'react';

import { ConfirmDialog } from '@app/pro-components';
import { ThemeContext } from '@app/contexts';

const useConfirmDialog = () => {
  const { setDialogNode } = useContext(ThemeContext);

  const destroyDialog = useCallback(() => {
    setDialogNode(undefined);
  }, []);

  const openDialog: OpenDialog = useCallback(
    ({ message, title, identifier, entity, onClickNot, onClickYes }) => {
      setDialogNode(
        <ConfirmDialog
          title={title}
          message={message}
          identifier={identifier}
          entity={entity}
          onClickYes={onClickYes}
          onClickNot={onClickNot || destroyDialog}
          onClose={destroyDialog}
        />,
      );
    },
    [destroyDialog],
  );

  return { open: openDialog, close: destroyDialog };
};

type OpenDialog = (params: { message?: string; title?: string, identifier: string, entity: string, onClickYes: () => void; onClickNot?: () => void }) => void;

export default useConfirmDialog;
