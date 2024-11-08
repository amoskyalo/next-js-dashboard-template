"use client";

import { useMediaQuery } from "@mui/material";

export const useResponsiveness = () => {
  const isMobile = useMediaQuery("(max-width:600px)", { noSsr: false });
  const isMiniTablet = useMediaQuery("(max-width:768px)", { noSsr: false });
  const isTablet = useMediaQuery("(max-width:1024px)", { noSsr: false });
  const isLaptop = useMediaQuery("(max-width: 1439px)", { noSsr: false });
  const isDesktop = useMediaQuery("(min-width: 1824px)", { noSsr: false });

  return { isMobile, isMiniTablet, isTablet, isLaptop, isDesktop };
};
