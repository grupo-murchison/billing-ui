import { useLocation } from 'react-router-dom';

function useLocationMode() {
  const url = useLocation();
  const canEdit = url?.pathname?.includes('edit') ? true : false;
  return { url, canEdit };
}

export default useLocationMode;
