// app/(anime)/complete-anime/[page]/page.tsx
import React from 'react';
import { getData } from '@/lib/GetData';
import AnimeGrid from '@/components/AnimeGrid2';
import Link from 'next/link';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/ButtonA';

interface CompleteAnimeData {
  status: string;
  data: Anime[];
  pagination: Pagination;
}

interface Anime {
  title: string;
  slug: string;
  poster: string;
  episode_count: string;
  rating: string;
  last_release_date: string;
  otakudesu_url: string;
  anime_url: string;
}

interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  next_page: number | null;
  has_previous_page: boolean;
  previous_page: number | null;
}

interface DetailAnimePageProps {
  params: {
    slug: string;
  };
}

export default async function AnimePage({ params }: DetailAnimePageProps) {
  let CompleteAnimeData: CompleteAnimeData;

  try {
    CompleteAnimeData = await getData(`${BaseUrl}/api/anime/complete-anime/${params.slug}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">Error Loading Data</h1>
        <p>Could not fetch data from the API. Please try again later.</p>
      </main>
    );
  }

  if (!Array.isArray(CompleteAnimeData.data)) {
    console.error('Expected CompleteAnimeData.data to be an array');
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">No Data Available</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="dark:text-lighta text-2xl font-bold mt-8 mb-4">Currently Finished Anime</h1>
      <AnimeGrid animes={CompleteAnimeData.data} />
      <PaginationComponent pagination={CompleteAnimeData.pagination} />
    </main>
  );
}

const PaginationComponent = ({ pagination }: { pagination: Pagination }) => {
  return (
    <div className="flex justify-between mt-8">
      {pagination.has_previous_page && pagination.previous_page !== null && (
        <div className="text-2xl font-bold mt-8 mb-4">
          <Link
            scroll
            href={`/anime/complete-anime/${pagination.previous_page}`}
            className="text-blue-600 hover:underline"
          >
            <ButtonA>Previous</ButtonA>
          </Link>
        </div>
      )}
      {pagination.has_next_page && pagination.next_page !== null && (
        <div className="text-2xl font-bold mt-8 mb-4">
          <Link scroll href={`/anime/complete-anime/${pagination.next_page}`} className="text-blue-600 hover:underline">
            <ButtonA>Next</ButtonA>
          </Link>
        </div>
      )}
    </div>
  );
};
