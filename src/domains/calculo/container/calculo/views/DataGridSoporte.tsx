import { useEffect, useState } from 'react';

import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { CalculoRepository } from '@domains/calculo/repository';

import { DateLib } from '@libs';

function DataGridSoporte({ facturacionContratoConceptoId }: { facturacionContratoConceptoId: number | null }) {
  const [eventos, setEventos] = useState<AnyValue>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (facturacionContratoConceptoId) {
      setLoading(true);
      CalculoRepository.getEventos(String(facturacionContratoConceptoId))
        .then(({ data }) => {
          const eventosConcatenados: any = []
          setEventos(data[0]?.eventos);

          for (const el of data) {
            eventosConcatenados.push(...el.eventos)
          }

          setEventos(eventosConcatenados);
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
