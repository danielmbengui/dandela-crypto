import React, { createContext, useContext } from 'react';
import { useMediaQuery } from "../styles/useMediaQuery";

export const DeviceModeProviderContext = createContext(null);

export default function DeviceModeProvider({children}) {
    const deviceMode = {
        isMobile: useMediaQuery(425),
        isTablet: useMediaQuery(768),
        isLaptop: useMediaQuery(1024),
        isDesktop: useMediaQuery(1440),
        isTv: useMediaQuery(2560),
    };
  
    return (
      <DeviceModeProviderContext.Provider value={deviceMode}>
        {children}
      </DeviceModeProviderContext.Provider>
    );
  }

  export const useDeviceMode = () => {
    return useContext(DeviceModeProviderContext);
  };