'use client';

import { forwardRef } from 'react';
import styles from './Input.module.scss';

/**
 * @description Reusable Input Component with styles that serve search bar
 */
const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${props.className}`}
      {...props}
      suppressHydrationWarning
    />
  );
});

Input.displayName = 'Input';

export default Input;
