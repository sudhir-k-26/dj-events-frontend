import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

function Layout({ title, description, keywords, children }) {
  const router = useRouter();
  const [props, setProps] = useState({
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
  });

  useEffect(() => {
    if (title) setProps((prev) => ({ ...prev, title }));
    if (description) setProps((prev) => ({ ...prev, description }));
    if (keywords) setProps((prev) => ({ ...prev, keywords }));
  }, [title, description, keywords]);

  //console.log('Layout props:', props); // Log to see if values are set

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <meta name='keywords' content={props.keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
