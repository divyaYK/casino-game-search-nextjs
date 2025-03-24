import { forwardRef, SVGAttributes } from 'react';
import SportsIconSVG from '@/assets/Sports.svg';

const SportsIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <SportsIconSVG ref={ref} {...props} />;
  }
);

SportsIcon.displayName = 'SportsIcon';

export default SportsIcon;
