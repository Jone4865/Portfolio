import { useMediaQuery } from 'react-responsive';

import {
  DESKTOP_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
  TABLET_MAX_WIDTH,
  TABLET_MIN_WIDTH,
} from 'constants/responsive';

const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const isTablet = useMediaQuery({ minWidth: TABLET_MIN_WIDTH, maxWidth: TABLET_MAX_WIDTH });
  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  return { isDesktop, isTablet, isMobile, isRetina, isPortrait };
};

export default useResponsive;
