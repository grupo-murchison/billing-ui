import { Chip, ChipProps } from '@mui/material';

type ColorType = Pick<ChipProps, 'color'>['color'];
type CustomChipProps = { estado: string };

const CustomChip = ({ estado }: CustomChipProps) => {
  return <Chip label={!estado ? '-------' : estado} variant='outlined' color={setColor(estado)} size='small' />;
};

export default CustomChip;

function setColor(estado: string): ColorType {
  let output: ColorType = 'default';

  estado = estado !== undefined ? estado.toUpperCase() : '';

  switch (estado.toUpperCase()) {
    case 'FACTURADO_CON_ERROR':
      output = 'error';
      break;
    case 'ACTIVO':
    case 'ABIERTO':
      output = 'info';
      break;
    case 'CALCULADO':
    case 'FACTURADO': // esto es cuando vuelve el dato de softland, esa funcionalidad no está disponible aún
      output = 'primary';
      break;
    case 'REVERSADO':
      output = 'secondary';
      break;
    case 'FINALIZADO':
      output = 'success';
      break;
    case 'ANULADO':
    case 'PAUSADO':
      output = 'warning';
      break;
    default:
      output = 'default';
  }
  return output;
}
