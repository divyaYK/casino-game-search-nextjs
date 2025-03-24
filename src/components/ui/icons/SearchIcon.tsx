import { forwardRef, SVGAttributes } from 'react';
import SearchIconSVG from '@/assets/variant=15.svg';

const SearchIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return <SearchIconSVG ref={ref} {...props} />;
  }
);

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;
