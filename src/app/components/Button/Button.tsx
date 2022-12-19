import clsx from 'clsx';

import styles from '@app/components/Button/Button.module.scss';

const Button = ({ className, color, icon, outlined, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(className, styles['button'], {
        [styles['button--icon']]: !!icon,
        [styles['button--primary-outlined']]: color === 'primary' && outlined,
      })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

type ButtonProps = {
  color: string;
  icon?: JSX.Element;
  outlined?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default Button;
