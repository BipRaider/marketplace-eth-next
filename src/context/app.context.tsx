import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export interface IAppContext {
  isLoading: boolean;
}

export const AppContext = createContext<IAppContext>({
  isLoading: false,
});
export const useAppContext = (): IAppContext => useContext(AppContext);

export const AppContextProvider = ({ children }: PropsWithChildren<IAppContext>): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const memoValue = useMemo((): IAppContext => {
    setIsLoading(false);
    return { isLoading };
  }, [isLoading]);

  return <AppContext.Provider value={memoValue}>{children}</AppContext.Provider>;
};
