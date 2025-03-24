import { forwardRef, SVGAttributes } from 'react';
import FireIconSVG from '@/assets/Featured Games.svg';

const FireIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <FireIconSVG ref={ref} {...props} />;
  }
);

FireIcon.displayName = 'FireIcon';

export default FireIcon;
