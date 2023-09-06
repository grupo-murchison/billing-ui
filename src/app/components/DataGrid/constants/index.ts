import { InitialContext } from '../contexts/types';

export const initialContext: InitialContext = {
  columns: [],
  currentPage: 0,
  onClickNew: () => {
    return;
  },
  // handleChangeRowsPerPage: () => {
  //   return;
  // },
  // handleNextPageChange: () => {
  //   return;
  // },
  // handlePrevPageChange: () => {
  //   return;
  // },
  handlePaginationModelChange: () => {
    return;
  },
  rows: [],
  // rowsCount: 0,
  pageSize: 50,
  rowsTotalCount: 0,
  loading: true,
  error: null,
  paginationModel: { page: 0, pageSize: 50 },
};
