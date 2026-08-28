export type PageIndicatorProps = {
  isDesktop: boolean;
  isTablet: boolean;
  activeSection: number;
  projectCount: number;
  onGoToSection: (section: number) => void;
};
