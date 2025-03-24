import { forwardRef, SVGAttributes } from 'react';
import ArrowRightIconSVG from '@/assets/ArrowRightIcon.svg';

const ArrowRightIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <ArrowRightIconSVG ref={ref} {...props} />;
  }
);

ArrowRightIcon.displayName = 'ArrowRightIcon';

export default ArrowRightIcon;
