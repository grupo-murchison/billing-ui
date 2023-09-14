import { useEffect, useState } from 'react';

import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

function DataGridSoporte({ facturacionContratoConceptoId }: { facturacionContratoConceptoId: number | null }) {
  const [eventos, setEventos] = useState<AnyValue>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (facturacionContratoConceptoId) {
      setLoading(true);
      FacturacionRepository.getEventos(String(facturacionContratoConceptoId))
        .then(({ data }) => {
          setEventos(data[0]?.eventos);
        })
        .catch()
        .finally(() => setLoading(false));
    } else {
      setEventos([]);
    }
  }, [facturacionContratoConceptoId]);

  return (
    <DataGridBase
      loading={loading}
      rows={eventos || []}
      columns={[
        {
          field: 'genDestinoId',
          headerName: 'VIN',
        },
        {
          field: 'genEventoTipoId',
          headerName: 'Tipo Evento',
        },
        {
          field: 'genEventoFechaCreacion',
          headerName: 'Fecha',
          valueGetter: params => DateLib.beautifyISO(params?.value),
        },
        {
          field: 'evDUA',
          headerName: 'DUA',
        },
        {
          field: 'evModelo',
          headerName: 'Modelo',
        },
        {
          field: 'genPatio',
          headerName: 'Patio',
        },
        {
          field: 'evTipoEmbarque',
          headerName: 'Tipo Embarque',
        },
      ]}
    />
  );
}

export default DataGridSoporte;
