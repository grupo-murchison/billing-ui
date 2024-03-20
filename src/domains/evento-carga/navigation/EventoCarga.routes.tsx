import { Routes, Route, Navigate } from 'react-router-dom';

import EventoCarga from '../container/EventoCarga';

const EventoCargaRoutes = () => {
  return (
    <Routes>
      <Route path='/evento-carga' element={<EventoCarga />}></Route>
      <Route path='/evento-carga/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default EventoCargaRoutes;
