import { InitialContext } from '../contexts/types';

export const initialContext: InitialContext = {
  columns: [],
  onClickNew: () => {
    return;
  },
  handlePaginationModelChange: () => {
    return;
  },
  rows: [],
  rowsTotalCount: 0,
  loading: true,
  error: null,
  paginationModel: { page: 0, pageSize: 50 },
};
