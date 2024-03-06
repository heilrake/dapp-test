import { ethers } from 'ethers';

export const getAccountData = async (
  ethereum: any,
  accounts: string[],
): Promise<{
  address: string;
  balance: string;
  chainId: string;
  network: string;
}> => {
  const address = accounts[0];
  const provider = new ethers.BrowserProvider(ethereum);
  const balance = await provider.getBalance(address);
  const network = await provider.getNetwork();
  return {
    address,
    balance: ethers.formatEther(balance),
    chainId: network.chainId.toString(),
    network: network.name,
  };
};
