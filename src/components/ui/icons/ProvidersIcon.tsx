import { forwardRef, SVGAttributes } from 'react';
import ProvidersIconSVG from '@/assets/Providers.svg';

const ProvidersIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <ProvidersIconSVG ref={ref} {...props} />;
  }
);

ProvidersIcon.displayName = 'ProvidersIcon';

export default ProvidersIcon;
