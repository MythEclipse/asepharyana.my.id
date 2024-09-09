import React from 'react';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData';
import { notFound } from 'next/navigation';
import { Local } from '@/lib/url';

interface KomikData {
  data: Manga[];
  prevPage: boolean;
  nextPage: boolean;
}

interface Manga {
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  komik_id: string;
}

export default async function Page({ params }: { params: { pageNumber: string } }) {
  const pageNumber = parseInt(params.pageNumber, 10);
  if (isNaN(pageNumber)) {
    notFound();
  }

  const komikData: KomikData = await getData(`${Local}/api/komik/manga?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={`/komik/manga/page/${pageNumber}`}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Manga
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {komikData.data.map((manga) => (
          <div key={manga.komik_id} className="flex-shrink-0 w-64 mx-auto md:mx-0">
            <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
              <div className="relative w-full h-64">
                <Image
                  src={manga.image}
                  alt={manga.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="mt-4 text-center">
                <Link scroll href={`/komik/detail/${manga.komik_id}`} className="text-blue-600 hover:underline">
                  <div className="text-lg font-bold mb-2 overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                    {manga.title}
                  </div>
                </Link>
                <div className="text-gray-600 dark:text-gray-400 mb-2">{manga.chapter}</div>
                <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {manga.score}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link scroll href={`/komik/manga/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </Button>
        </Link>
        <Link scroll href={`/komik/manga/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.nextPage}
          >
            Next Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
