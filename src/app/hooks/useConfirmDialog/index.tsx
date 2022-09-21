import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';

import { ConfirmDialog } from '@app/components';

const useConfirmDialog = () => {
  const [dialog, setDialog] = useState<ReactNode>();

  const destroyDialog = useCallback(() => {
    setDialog(undefined);
  }, []);

  const openDialog: OpenDialog = useCallback(
    ({ message, onClickNot, onClickYes }) => {
      setDialog(
        <ConfirmDialog
          message={message}
          onClickYes={onClickYes}
          onClickNot={onClickNot || destroyDialog}
          onClose={destroyDialog}
        />,
      );
    },
    [destroyDialog],
  );

  return { dialog, openDialog, closeDialog: destroyDialog };
};

type OpenDialog = (params: { message: string; onClickYes: () => void; onClickNot?: () => void }) => void;

export default useConfirmDialog;
