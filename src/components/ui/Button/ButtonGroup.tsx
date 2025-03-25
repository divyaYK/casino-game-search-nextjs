import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';
import styles from './Button.module.scss';

/**
 * @description Created to wrap the Split Button type button group
 */
const ButtonGroup = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      role="group"
      {...rest}
      className={`${styles['btn-wrapper']} ${className}`}
    >
      {children}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
