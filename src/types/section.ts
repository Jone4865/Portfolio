export type SectionLayoutProps = {
  isActive: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

export type ResponsiveLayoutProps = {
  isDesktop: boolean;
  isTablet: boolean;
};

export type ResponsiveFlags = ResponsiveLayoutProps & {
  isMobile: boolean;
};
