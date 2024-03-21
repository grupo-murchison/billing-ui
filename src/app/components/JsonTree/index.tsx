import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMoreIcon } from '@assets/icons';

export const JsonViewerProvisorio = ({ object, label }: { object: JSONObject; label?: string }) => {
  const keys = Object.keys(object);
  return (
    <>
      {keys.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>{'Datos Crudos' + `${label ? ' - ' + label : ''}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mx: '2.5rem' }}>
              <ul>
                {keys.map((key: string, index: number) => (
                  <li key={index}>{`${key}: ${object[key]}`}</li>
                ))}
              </ul>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

type JSONValue = string | number | boolean | JSONObject;

export interface JSONObject {
  [key: string]: JSONValue;
}