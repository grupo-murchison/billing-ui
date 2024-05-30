import { useCallback, useRef, useState } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, alpha, CircularProgress, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DragDropFileUploadProps } from '../Form/form.interfaces';

function DragDropFileUpload({
  onChange,
  accept,
  loading,
  multiple,
  disabled,
  name,
  autoclear,
}: DragDropFileUploadProps) {
  const [fileToSend, setFileToSend] = useState<FileList | null>(null);
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
        onChange(event.dataTransfer.files);
        setFileToSend(event.dataTransfer.files);
      }
    },
    [onChange, loading, disabled],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !loading && event.target.files && event.target.files[0]) {
        onChange(event.target.files);
        setFileToSend(event.target.files);
      }
      // Limpiar el valor del inpunt para permitir recargar el mismo archivo. Útil por ejemplo si da error y queremos reenviar
      if (fileInputRef.current && autoclear) fileInputRef.current.value = '';
    },
    [onChange, loading, disabled],
  );

  const handleDeleteFileToSend = useCallback(() => {
    onChange(null);
    setFileToSend(null);
  }, [onChange]);

  return (
    <>
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
            !disabled && !loading && isDragActive
              ? alpha(theme.palette.primary.light, 0.5)
              : theme.palette.common.white,
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
      <Box sx={{ marginY: 2 }}>
        {fileToSend && fileToSend[0] && (
          <Chip
            label={`${fileToSend[0].name}`}
            variant='outlined'
            onDelete={handleDeleteFileToSend}
            size='medium'
            color='primary'
          />
        )}
      </Box>
    </>
  );
}

export default DragDropFileUpload;
