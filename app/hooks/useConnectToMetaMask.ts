import { useCallback } from 'react';
import { useMetaMaskDataContext } from '../context/metamask-account-data';
import { checkMetaMaskAvailability } from '../utils/checkMetaMaskAvailability';
import { getAccountData } from './service';

export const useConnectToMetaMask = () => {
  const { setAccountData } = useMetaMaskDataContext();

  const connectMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;

    if (!checkMetaMaskAvailability()) {
      alert('MetaMask not installed');
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const accountData = await getAccountData(window.ethereum, accounts);
      setAccountData(accountData);
    } catch (error) {
      alert(`Error connecting to MetaMask: ${error.message ?? error}`);
    }
  }, [setAccountData]);

  return { connectMetaMask };
};
