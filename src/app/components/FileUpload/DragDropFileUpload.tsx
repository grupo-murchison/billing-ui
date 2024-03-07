import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, alpha, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type DragDropFileUploadProps = {
  onFileUpload: (file: FileList) => void;
  accept?: string; // 'Ejemplo: image/*'
  loading: boolean;
  multiple?: boolean;
  name: string;
};

function DragDropFileUpload({ onFileUpload, accept, loading, multiple }: DragDropFileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
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
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        onFileUpload(event.dataTransfer.files);
      }
    },
    [onFileUpload],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        onFileUpload(event.target.files);
      }
    },
    [onFileUpload],
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
        cursor: 'pointer',
        background: isDragActive ? alpha(theme.palette.primary.light, 0.5) : theme.palette.common.white,
      }}
    >
      <input
        accept={accept}
        style={{ display: 'none' }}
        id='raised-button-file'
        multiple={multiple}
        type='file'
        onChange={handleChange}
      />
      <label htmlFor='raised-button-file'>
        <Box display='flex' flexDirection='column' alignItems='center'>
          {loading ? (
            <CircularProgress />
          ) : (
            <IconButton color={isDragActive ? 'inherit' : 'primary'} aria-label='upload picture' component='span'>
              <CloudUploadIcon sx={{ fontSize: 60 }} />
            </IconButton>
          )}
          <Typography sx={{ cursor: 'pointer' }}>
            Arrastre y suelte aquí su archivo o haga click para seleccionar
          </Typography>
        </Box>
      </label>
    </Paper>
  );
}

export default DragDropFileUpload;
