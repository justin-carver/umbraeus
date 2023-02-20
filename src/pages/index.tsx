import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Stack, Title } from '@mantine/core';
import Umbraeus from './components/Umbraeus';

import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

// TODO: Validate POST requests using special authorized cookie or token.

const Home = () => {
	const callAPI = async () => {
		try {
			const res = await fetch('api/queryWallpapers', {
				method: 'GET',
			});
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
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
				<Stack p={60} align={'flex-start'} spacing={'lg'}>
					<Title
						order={1}
						className={`${inter.className} ${styles.title}`}>
						UMBRAEUS
					</Title>
					<div className={styles.hr} />
					<Umbraeus />
				</Stack>
			</main>
		</>
	);
};

export default Home;
