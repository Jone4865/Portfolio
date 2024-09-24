import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  return { isDesktop, isTablet, isMobile, isRetina, isPortrait };
};

export default useResponsive;
