import { ethers } from 'ethers';
import { useCallback } from 'react';
import { checkMetaMaskAvailability } from '../utils/checkMetaMaskAvailability';

export const useSendMessageToMetaMask = () => {
  const sendMessageToMetaMask = useCallback(async (message: { nonce: string }) => {
    const ethereum = await window.ethereum;

    if (!checkMetaMaskAvailability()) {
      alert('MetaMask not installed');
      return;
    }

    const signer = await new ethers.BrowserProvider(ethereum).getSigner();
    try {
      await signer.signMessage(message.nonce);
    } catch (error) {
      alert('User denied message signature or some error occurred.');
    }
    return;
  }, []);

  return { sendMessageToMetaMask };
};
