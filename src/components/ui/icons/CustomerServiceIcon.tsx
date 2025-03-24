import { forwardRef, SVGAttributes } from 'react';
import CustomerServiceIconSVG from '@/assets/variant=27.svg';

const CustomerServiceIcon = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement>
>((props, ref) => {
  return <CustomerServiceIconSVG ref={ref} {...props} />;
});

CustomerServiceIcon.displayName = 'CustomerServiceIcon';

export default CustomerServiceIcon;
