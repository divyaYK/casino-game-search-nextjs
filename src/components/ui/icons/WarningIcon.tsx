import { forwardRef, SVGAttributes } from 'react';
import WarningIconSVG from '@/assets/warning-icon.svg';

const WarningIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <WarningIconSVG ref={ref} {...props} />;
  }
);

WarningIcon.displayName = 'WarningIcon';

export default WarningIcon;
