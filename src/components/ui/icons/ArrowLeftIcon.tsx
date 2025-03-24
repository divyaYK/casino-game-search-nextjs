import { forwardRef, SVGAttributes } from 'react';
import ArrowLeftIconSVG from '@/assets/ArrowLeftIcon.svg';

const ArrowLeftIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <ArrowLeftIconSVG ref={ref} {...props} />;
  }
);

ArrowLeftIcon.displayName = 'ArrowLeftIcon';

export default ArrowLeftIcon;
