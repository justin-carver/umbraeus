import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useState } from 'react';
import { Stack, Title } from '@mantine/core';
import { AiFillGithub } from 'react-icons/ai';

import Umbraeus from './components/Umbraeus';

import styles from '@/styles/Home.module.css';
import ScrollToTop from './components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

// TODO: Validate POST requests using special authorized cookie or token.

const Home = () => {
	const [showAffix, setAffix] = useState(false);

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
				<Stack align={'center'}>
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
						<Title
							order={6}
							className={`${inter.className} ${styles.madeby}`}>
							Created by{' '}
							<a href="https://github.com/justin-carver">
								JUSTIN CARVER{' '}
								<AiFillGithub
									size={20}
									className={styles.github}
								/>
							</a>
						</Title>
					</Stack>
					<Umbraeus showAffix={setAffix} />
				</Stack>
				<ScrollToTop affix={showAffix} />
			</main>
		</>
	);
};

export default Home;
