import { forwardRef, SVGAttributes } from 'react';
import HeartIconSVG from '@/assets/heart-icon.svg';

const HeartIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <HeartIconSVG ref={ref} {...props} />;
  }
);

HeartIcon.displayName = 'HeartIcon';

export default HeartIcon;
