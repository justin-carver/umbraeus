import { Image } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Flex } from '@mantine/core';
import { wallpaper } from '../../types';

import styles from '@/styles/Umbraeus.module.css';

const Umbraeus = () => {
	const [images, setImages] = useState<wallpaper[]>([]);
	const [loading, setLoading] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/queryWallpapers?page=${pageNumber}`)
			.then((response) => response.json())
			.then((data) => {
				setImages((prevImages) => [...prevImages, ...data]);
				setLoading(false);
			});
	}, [pageNumber]);

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } =
			document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
			setPageNumber((prevPageNumber) => prevPageNumber + 1);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Flex
			align={'flex-start'}
			justify={'flex-start'}
			direction={'row'}
			wrap={'wrap'}
			gap={'xl'}>
			{images.map((image: wallpaper) => (
				<div key={Math.random()} className={styles.wallpaper_image}>
					<Image width={'440px'} src={image.src} alt={image.alt} />
				</div>
			))}
			{loading && <div>Loading more images...</div>}
		</Flex>
	);
};

export default Umbraeus;
