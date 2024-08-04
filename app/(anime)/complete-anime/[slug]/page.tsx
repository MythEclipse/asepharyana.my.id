// app/(anime)/complete-anime/[page]/page.tsx
import React from 'react';
import { getData } from '@/components/core/GetData/GetData';
import AnimeGrid from '@/components/AnimeGrid';
import Link from 'next/link';

interface HomeData {
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
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app';
  let homeData: HomeData;

  try {
    homeData = await getData(`${BASEURL}/v1/complete-anime/${params.slug}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">Error Loading Data</h1>
        <p>Could not fetch data from the API. Please try again later.</p>
      </main>
    );
  }

  if (!Array.isArray(homeData.data)) {
    console.error('Expected homeData.data to be an array');
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">No Data Available</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mt-8 mb-4">Currently Finished Anime</h1>
      <AnimeGrid animes={homeData.data} />
      <PaginationComponent pagination={homeData.pagination} />
    </main>
  );
}

const PaginationComponent = ({ pagination }: { pagination: Pagination }) => {
  return (
    <div className="flex justify-between mt-8">
      {pagination.has_previous_page && pagination.previous_page !== null && (
        <Link href={`/complete-anime/${pagination.previous_page}`} className="text-blue-600 hover:underline">
          Previous
        </Link>
      )}
      {pagination.has_next_page && pagination.next_page !== null && (
        <Link href={`/complete-anime/${pagination.next_page}`} className="text-blue-600 hover:underline">
          Next
        </Link>
      )}
    </div>
  );
};
