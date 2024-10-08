'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiCollection, HiSearch, HiMenu } from 'react-icons/hi';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/komik/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <HiMenu className="inline-block mr-2" /> MENU
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <form onSubmit={handleSearch} className="p-4">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pencarian untuk komik..."
              className="bg-transparent text-gray-900 dark:text-gray-100"
              required
            />
            <Button type="submit" className="mt-2">
              Search
            </Button>
          </form>
          <div className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/komik">
                  <Button variant="outline" className="w-full text-left">
                    <HiHome className="inline-block mr-2" /> Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/komik/manga">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Latest Manga
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/komik/manhua">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Latest Manhua
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/komik/manhwa">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Latest Manhwa
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchDrawer;
