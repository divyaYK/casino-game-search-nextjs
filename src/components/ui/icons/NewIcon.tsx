import { forwardRef, SVGAttributes } from 'react';
import NewIconSVG from '@/assets/New Games.svg';

const NewIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <NewIconSVG ref={ref} {...props} />;
  }
);

NewIcon.displayName = 'NewIcon';

export default NewIcon;
