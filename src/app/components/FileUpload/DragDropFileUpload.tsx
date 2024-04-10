import { useCallback, useRef, useState } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, alpha, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type DragDropFileUploadProps = {
  onFileUpload: (file: FileList) => void;
  accept?: string; // 'Ejemplo: image/*'
  loading: boolean;
  multiple?: boolean;
  name: string;
  disabled?: boolean;
};

function DragDropFileUpload({ onFileUpload, accept, loading, multiple, disabled, name }: DragDropFileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(false);
      if (!disabled && !loading && event.dataTransfer.files && event.dataTransfer.files[0]) {
        onFileUpload(event.dataTransfer.files);
      }
    },
    [onFileUpload, loading, disabled],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !loading && event.target.files && event.target.files[0]) {
        onFileUpload(event.target.files);
      }

      // Limpiar el valor del inpunt para permitir recargar el mismo archivo. Útil por ejemplo si da error y queremos reenviar
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [onFileUpload, loading, disabled],
  );

  return (
    <Paper
      variant='outlined'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: isDragActive ? '2px solid primary' : '1.5px dashed #aaa',
        padding: 4,
        textAlign: 'center',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        background:
          !disabled && !loading && isDragActive ? alpha(theme.palette.primary.light, 0.5) : theme.palette.common.white,
      }}
    >
      <input
        id={name}
        name={name}
        ref={fileInputRef}
        accept={accept}
        style={{ display: 'none' }}
        multiple={multiple}
        type='file'
        onChange={handleChange}
        disabled={disabled || loading}
      />
      <label htmlFor={name}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          {loading ? (
            <CircularProgress />
          ) : (
            <IconButton
              color={isDragActive ? 'inherit' : 'primary'}
              aria-label='upload file'
              component='span'
              disabled={disabled || loading}
            >
              <CloudUploadIcon sx={{ fontSize: 60 }} />
            </IconButton>
          )}
          <Typography sx={{ cursor: disabled || loading ? 'not-allowed' : 'pointer' }}>
            Arrastre y suelte aquí su archivo o haga click para seleccionar
          </Typography>
        </Box>
      </label>
    </Paper>
  );
}

export default DragDropFileUpload;
