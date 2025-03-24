import { forwardRef, SVGAttributes } from 'react';
import GameShowIconSVG from '@/assets/Game Shows.svg';

const GameShowIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <GameShowIconSVG ref={ref} {...props} />;
  }
);

GameShowIcon.displayName = 'GameShowIcon';

export default GameShowIcon;
