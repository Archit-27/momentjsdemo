import { forwardRef, MouseEventHandler, ReactNode } from 'react';
import cn from "classnames";
import styles from './styles.module.css';

interface IButton {
  children?: ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export type Ref = HTMLButtonElement

export const Button = forwardRef<Ref, IButton>(
  ({ children, type, className, ...restProps }, ref) => (
    <button ref={ref} className={cn(styles.btn, className)} type={type} {...restProps}>
      {children}
    </button>
  )
)
