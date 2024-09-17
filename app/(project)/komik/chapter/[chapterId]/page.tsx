/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/GetData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BaseUrl } from '@/lib/url';

interface ChapterDetail {
  title: string;
  komik_id: string;
  prev_chapter_id: string;
  next_chapter_id: string;
  downloadUrl: string;
  images: string[];
}

export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
  const { chapterId } = params;
  const chapter: ChapterDetail = await getData(`${BaseUrl}/api/komik/chapter?chapter_url=${chapterId}`);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="p-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">{chapter.title}</h1>
        <div className="mt-4 flex justify-between gap-4">
          {chapter.prev_chapter_id && (
            <Link scroll href={`/komik/chapter/${chapter.prev_chapter_id}`}>
              <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Previous Chapter
              </Button>
            </Link>
          )}
          {chapter.next_chapter_id && (
            <Link scroll href={`/komik/chapter/${chapter.next_chapter_id}`}>
              <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Next Chapter
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 md:mx-auto">
        {chapter.images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '300px', // Placeholder height, adjust as needed
              backgroundColor: '#f0f0f0' // Placeholder background color
            }}
            className=""
          >
            <Image
              src={image}
              alt={`Chapter ${chapter.title} - page ${index + 1}`}
              className="object-cover transition-opacity duration-300"
              width="725"
              height="1024"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between gap-4">
        {chapter.prev_chapter_id && (
          <Link scroll href={`/komik/chapter/${chapter.prev_chapter_id}`}>
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Previous Chapter
            </Button>
          </Link>
        )}
        {chapter.next_chapter_id && (
          <Link scroll href={`/komik/chapter/${chapter.next_chapter_id}`}>
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Next Chapter
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
