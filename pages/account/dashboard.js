import React from 'react';
import Layout from '@/components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteEvent = async (documentId) => {
    console.log(documentId);
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${documentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast.error(res.message);
      } else {
        router.push('/events');
      }
    }
  };
  const eventsData = Array.isArray(events?.data) ? events.data : [];
  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {eventsData.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  // console.log(token);
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events, token },
  };
}
