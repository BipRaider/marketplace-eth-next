import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface IAppContext {}

export const AppContext = createContext<IAppContext>({});
export const useAppContext = (): IAppContext => useContext(AppContext);

export const AppContextProvider = ({ children }: PropsWithChildren<IAppContext>): React.JSX.Element => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
