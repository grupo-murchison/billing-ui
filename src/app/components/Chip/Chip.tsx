import { Chip } from '@mui/material';

type ColorType =  "default" | "primary" | "info" | "error" | "secondary" | "success" | "warning"

const CustomChip = ({estado}: AnyValue): AnyValue=>{  

    function setColor (text: string): ColorType{
        let output: ColorType = 'default'

        text = text !== undefined ? text.toUpperCase() : output

        switch (text.toUpperCase()) {
          case 'ACTIVO':
            output = 'info'
            break;
          case 'PAUSADO':
            output = 'warning'
            break;
          case 'FINALIZADO':
            output = 'primary'
            break;      
          case 'ABIERTO':
            output = 'info'
            break;
          case 'ANULADO':
            output = 'warning'
            break;
          case 'FACTURADO':
            output = 'primary'
            break;
          case 'REVERSADO':
            output = 'secondary'
            break;
          case 'FACTURADO_CON_ERROR':
            output = 'warning'
            break;
          default:
            output = 'default'
        }
      return output
    }

    return (
      <Chip
        label={!estado ? '-------' : estado}
        variant='outlined'
        color={setColor(estado)}
        size='small'
      />
    )
}

export default CustomChip;
