import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Stack, Title } from '@mantine/core';

import Umbraeus from './components/Umbraeus';

import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

// TODO: Validate POST requests using special authorized cookie or token.

const Home = () => {
	return (
		<>
			<Head>
				<title>Umbraeus</title>
				<meta
					name="description"
					content="Dark wallpapers for those dark hours. Clean, high-quality, 4k - 8k+, dark-themed landscape wallpapers."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Stack p={60} align={'center'} spacing={80}>
					<Stack className={styles.title_group} align={'center'}>
						<Title
							order={1}
							className={`${inter.className} ${styles.title}`}>
							UMBRAEUS
						</Title>
						<Title
							order={5}
							className={`${inter.className} ${styles.subtitle}`}>
							Dark wallpapers for those dark hours.
							<br />
							Clean, high-quality, 2k - 8k+, dark-themed landscape
							wallpapers.
						</Title>
					</Stack>
					{/* <div className={styles.hr} /> */}
					<Umbraeus />
				</Stack>
			</main>
		</>
	);
};

export default Home;
