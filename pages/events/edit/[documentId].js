import React from 'react';
import { FaImage } from 'react-icons/fa';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { parseCookies } from '@/helpers/index';
export default function EditEventPage({ evt, token }) {
  console.log(token);
  const imageUploaded = async (e) => {
    const res = await fetch(
      `${API_URL}/api/events/${evt.documentId}?populate=*`
    );
    const data = await res.json();
    //console.log(data);
    const thumbnail = data.data.image?.formats?.thumbnail?.url;
    setImagePreview(thumbnail || data.data.image?.url || null);
    //setImagePreview(data.data.image.formats.thumbnail.url);
    setShowModal(false);
  };
  const description = evt.description;
  const descriptionText = description
    ?.map((desc) => desc.children?.map((child) => child.text).join(' '))
    .join(' '); // Join multiple paragraphs if there are any
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: moment(evt.date).format('yyyy-MM-DD'),
    time: evt.time,
    description: descriptionText,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const updatedValues = {
      ...values,
      description: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: values.description,
            },
          ],
        },
      ],
    };
    //console.log(updatedValues);
    const res = await fetch(`${API_URL}/api/events/${evt.documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: updatedValues }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
        return;
      }
      toast.error('something went wrong');
    } else {
      const evt = await res.json();
      //console.log(evt);
      router.push(`/events/${evt.data.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type='submit' value='Edit Event' className='btn' />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className='btn-secondary'>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { documentId }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/${documentId}?populate=*`);
  const data = await res.json();
  const evt = data.data;
  //console.log(evt);
  //console.log(req.headers.cookie);
  return {
    props: {
      evt,
      token,
    },
  };
}
