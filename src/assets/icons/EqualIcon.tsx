import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function EqualIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      {/* https://fonts.google.com/icons?icon.query=equal */}
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' height='24' width='24'>
        <path d='M160-280v-120h640v120H160Zm0-280v-120h640v120H160Z' />
      </svg>
    </SvgIcon>
  );
}
