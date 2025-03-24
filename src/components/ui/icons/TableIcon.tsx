import { forwardRef, SVGAttributes } from 'react';
import TableIconSVG from '@/assets/Table Games.svg';

const TableIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <TableIconSVG ref={ref} {...props} />;
  }
);

TableIcon.displayName = 'TableIcon';

export default TableIcon;
