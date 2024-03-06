import { Inter } from 'next/font/google';
import Link from 'next/link';

import { Header } from './components/common/Header/Header';
import { SignUpWindow } from './components/common/Modals/SignUpWindow';
import { AudioElement } from './components/ui/AudioElement';

const inter = Inter({ subsets: ['latin'] });

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
  const show = searchParams?.popup === 'signup';
  return (
    <div
      className={`h-full flex flex-col before:from-white after:from-sky-200 py-2 ${inter.className}`}>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <AudioElement>
          <Link
            href={{
              pathname: '/',
              query: { popup: 'signup' },
            }}
            className="bg-black w-20 h-10 text-center text-white p-1 rounded-lg">
            SignUp
          </Link>
        </AudioElement>
      </div>
      {show && <SignUpWindow />}
    </div>
  );
}
