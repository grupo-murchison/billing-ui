import { Chip } from '@mui/material';

type ColorType =  "default" | "primary" | "info" | "error" | "secondary" | "success" | "warning"

const CustomChip = ({estado}: AnyValue): any=>{  

    function setColor (text: string): ColorType{
        let output: ColorType = 'default'
        switch (text) {
            case 'FACTURADO':
              output = 'primary'
              break;
            case 'ABIERTO':
              output = 'info'
              break;
            case 'ANULADO':
              output = 'error'
              break;
            case 'ACTIVO':
              output = 'secondary'
              break;
        }
        return output
    }

    return (
      <Chip
        label={estado}
        variant='outlined'
        color={setColor(estado)}
        size='small'
      />
    )
}

export default CustomChip;
