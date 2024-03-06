'use client';
import { useMetaMaskDataContext } from '@/app/context/metamask-account-data';

export const AccountInformation = () => {
  const { accountData } = useMetaMaskDataContext();

  return (
    <div className="flex-1 px-2 mx-2">
      🟢 <span>User wallet address: {accountData.address ?? 'unknown'}</span>
    </div>
  );
};
