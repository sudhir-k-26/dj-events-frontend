import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { API_URL, PER_PAGE } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_SORT=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const events = await res.json();
  const total = events.meta.pagination.total;
  return {
    props: { events: events.data, page: +page, total },
  };
}
