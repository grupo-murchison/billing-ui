import { Chip, Divider } from '@mui/material';

export const DivisorProvisorio = ({ label, chip }: { label: string; chip?: boolean }) => (
  <Divider sx={{ my: '2rem' }} textAlign='left'>
    {chip ? <Chip label={label} /> : <>{label}</>}
  </Divider>
);
