import React from 'react';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';
export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <Link href={`/events/edit/${evt.documentId}`}>
        <div className={styles.edit}>
          <FaPencilAlt />
          <span> Edit Event</span>
        </div>
      </Link>
      <Link
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(evt.documentId)}
      >
        <FaTimes />
        <span>Delete</span>
      </Link>
    </div>
  );
}
