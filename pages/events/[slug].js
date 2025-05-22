import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});
export default function EventPage({ evt }) {
  const router = useRouter();
  const description = evt.description;
  const descriptionText = description
    ?.map((desc) => desc.children?.map((child) => child.text).join(' '))
    .join(' '); // Join multiple paragraphs if there are any

  // const deleteEvent = async (e) => {
  //   if (confirm('Are you sure?')) {
  //     const res = await fetch(`${API_URL}/api/events/${evt.documentId}`, {
  //       method: 'DELETE',
  //     });
  //     if (!res.ok) {
  //       toast.error(res.message);
  //     } else {
  //       router.push('/events');
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.documentId}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href='#' onClick={deleteEvent} className={styles.delete}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
              alt=''
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{descriptionText}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Map lat={40.7128} lng={-74.006} />

        <Link href='/events' className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const data = await res.json();
  const events = data.data;
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = await res.json();
  const events = data.data;
  if (!events || events.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
