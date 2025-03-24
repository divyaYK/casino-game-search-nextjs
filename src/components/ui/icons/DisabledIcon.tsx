import { forwardRef, SVGAttributes } from 'react';
import DisabledIconSVG from '@/assets/disabled-icon.svg';

const DisabledIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <DisabledIconSVG ref={ref} {...props} />;
  }
);

DisabledIcon.displayName = 'DisabledIcon';

export default DisabledIcon;
