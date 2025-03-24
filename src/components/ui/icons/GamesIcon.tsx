import { forwardRef, SVGAttributes } from 'react';
import AllGamesIconSVG from '@/assets/games-icon.svg';

const AllGamesIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <AllGamesIconSVG ref={ref} {...props} />;
  }
);

AllGamesIcon.displayName = 'AllGamesIcon';

export default AllGamesIcon;
