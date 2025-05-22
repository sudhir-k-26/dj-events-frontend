import React from 'react';
import Link from 'next/link';
import { PER_PAGE } from '@/config/index';
export default function Pagination({ total, page }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link className='btn-secondary' href={`/events?page=${page - 1}`}>
          Prev
        </Link>
      )}

      {page < lastPage && (
        <Link className='btn-secondary' href={`/events?page=${page + 1}`}>
          Next
        </Link>
      )}
    </>
  );
}
