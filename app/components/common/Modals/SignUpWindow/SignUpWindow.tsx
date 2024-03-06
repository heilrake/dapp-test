'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { useConnectToMetaMask } from '@/app/hooks/useConnectToMetaMask';
import { useMetaMaskDataContext } from '@/app/context/metamask-account-data';
import { useSendMessageToMetaMask } from '@/app/hooks/useSendMessageToMetaMask';

export const SignUpWindow = () => {
  const router = useRouter();

  const { connectMetaMask } = useConnectToMetaMask();
  const { sendMessageToMetaMask } = useSendMessageToMetaMask();
  const { accountData } = useMetaMaskDataContext();

  const handleSendNonce = async () => {
    try {
      const nonceResponse = await fetch(`/api/eth/nonce?walletAddress=${accountData.address}`);
      const nonce = await nonceResponse.json();

      await sendMessageToMetaMask(nonce);

      await fetch(`/api/auth/metamask/sign-in`, {
        method: 'POST',
        body: JSON.stringify({
          walletAddress: accountData.address,
          signature: nonce.nonce,
        }),
      });
      toast.success('You did it!');
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClick = (e) => {
    if (e.target !== e.currentTarget) return;
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleModalClick}>
      <div
        className="absolute w-80 h-52 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col  gap-5 p-8">
          <p className="text-center text-3xl font-bold">SignUp</p>
          <div className="flex flex-col flex-1 justify-center items-center">
            {accountData?.address ? (
              <div className="flex flex-col gap-1 items-center text-center">
                <p className="text-sm">You need subscribe. Click the button again</p>
                <button onClick={handleSendNonce} className="bg-black text-white p-4 rounded-lg">
                  Send Message
                </button>
              </div>
            ) : (
              <button
                onClick={connectMetaMask}
                className="bg-black text-white p-4 rounded-lg flex gap-2 items-center">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  alt="MetaMask"
                  width={36}
                  height={36}
                  priority
                />
                <p>Connect to MetaMask</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
