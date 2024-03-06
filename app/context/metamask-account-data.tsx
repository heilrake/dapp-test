'use client';
import { type PropsWithChildren, createContext, useContext, useState } from 'react';

interface AccountData {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const MetamaskContext = createContext<{
  accountData: AccountData;
  setAccountData: React.Dispatch<React.SetStateAction<AccountData>>;
}>({
  accountData: {},
  setAccountData: () => {},
});

export const MetamaskProvider = ({ children }: PropsWithChildren) => {
  const [accountData, setAccountData] = useState<AccountData>({});

  return (
    <MetamaskContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </MetamaskContext.Provider>
  );
};

export function useMetaMaskDataContext() {
  const context = useContext(MetamaskContext);

  if (!context) {
    throw new Error('useMetaMaskDataContext should only be called inside FormEditProvider');
  }
  return context;
}
