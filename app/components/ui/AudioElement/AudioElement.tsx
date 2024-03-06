'use client';
import useSound from 'use-sound';

export const AudioElement = ({ children }: any) => {
  const [playActive] = useSound('/click-sound.mp3');
  return <div onClick={() => playActive()}>{children}</div>;
};
