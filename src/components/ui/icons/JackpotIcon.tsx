import { forwardRef, SVGAttributes } from 'react';
import JackpotIconSVG from '@/assets/Jackpot.svg';

const JackpotIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <JackpotIconSVG ref={ref} {...props} />;
  }
);

JackpotIcon.displayName = 'JackpotIcon';

export default JackpotIcon;
