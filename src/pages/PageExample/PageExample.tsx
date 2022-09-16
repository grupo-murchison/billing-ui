import DataTable from '@components/DataTable';
// import { ProductoSoftlandRepository } from '@repositories';

const PageExample = () => {
  // const page = { offset: 2, limit: 5 };
  // const data = async () => {
  //   await ProductoSoftlandRepository.getAllProductoSoftland(page);
  // };

  function createData(id: number, userName: string, agrupacion: string, codigo: string, descripcion: string): Data {
    return {
      id,
      userName,
      agrupacion,
      codigo,
      descripcion,
    };
  }

  const datosGen = [
    createData(1, 'usuario1', 'VALOR AGREGADO', '305', 'lavado'),
    createData(2, 'usuario1', 'VALOR AGREGADO', '306', 'pulido'),
    createData(3, 'usuario2', 'VALOR AGREGADO', '307', 'combustible'),
    createData(4, 'usuario5', 'ALMACENAJE', '311', 'ALMACENAJE'),
  ];

  interface Data {
    id: number;
    userName: string;
    agrupacion: string;
    codigo: string;
    descripcion: string;
  }

  return (
    <>
      <DataTable rows={datosGen} />
    </>
  );
};

export default PageExample;
