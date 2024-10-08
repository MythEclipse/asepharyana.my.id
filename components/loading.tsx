import React from 'react';
import Image from 'next/image';
import loadingGif from '@/public/loading.gif';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="rounded-full h-32 w-32">
        <Image
          src={loadingGif}
          alt="loading"
          width={150}
          height={150}
          className="h-full w-full rounded-full"
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default Loading;
