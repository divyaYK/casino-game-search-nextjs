import { forwardRef, SVGAttributes } from 'react';
import SlotsIconSVG from '@/assets/Slots.svg';

const SlotsIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <SlotsIconSVG ref={ref} {...props} />;
  }
);

SlotsIcon.displayName = 'SlotsIcon';

export default SlotsIcon;
