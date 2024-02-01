// BaseUrlContext.js
import React, { createContext, useContext, useState } from 'react';
import config from './config';

const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState(config.baseUrl);

  return (
    <BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => {
  return useContext(BaseUrlContext);
};
