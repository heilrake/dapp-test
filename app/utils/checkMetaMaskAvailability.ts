export const checkMetaMaskAvailability = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};
