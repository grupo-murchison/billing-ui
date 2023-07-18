// import clsx from 'clsx';

// import styles from '@app/components/Button/Button.module.scss';

// const Button = ({ className, color, icon, outlined, children, ...props }: ButtonProps) => {
//   //TODO sacar las clases sass
//   return (
//     <button
//       className={clsx(className, styles['button'], {
//         [styles['button--icon']]: !!icon,
//         [styles['button--primary']]: color === 'primary' && !outlined,
//         [styles['button--primary-outlined']]: color === 'primary' && outlined,
//         [styles['button--secondary']]: color === 'secondary' && !outlined,
//         [styles['button--secondary-outlined']]: color === 'secondary' && outlined,
//       })}
//       {...props}
//     >
//       {icon}
//       {children}
//     </button>
//   );
// };

// type ButtonProps = {
//   color: string;
//   icon?: JSX.Element;
//   outlined?: boolean;
// } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// export default Button;
