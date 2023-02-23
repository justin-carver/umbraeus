import { useState, useEffect } from 'react';
import { Flex, Text, Stack, BackgroundImage } from '@mantine/core';
import { wallpaper } from '../../types';

import styles from '@/styles/Umbraeus.module.css';
import Lightbox from './Lightbox';

// TODO: At some point, the image should become a separate component.

const Umbraeus = () => {
	const [images, setImages] = useState<wallpaper[]>([]);
	const [loading, setLoading] = useState(false);
	const [lightbox, setLightbox] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/queryWallpapers?page=${pageNumber}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.count) {
					setImages((prevImages) => [
						...prevImages,
						...data.documents,
					]);
					setLoading(false);
				} else {
				}
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
		<>
			{lightbox && <Lightbox />}
			<Flex
				align={'flex-start'}
				justify={'flex-start'}
				direction={'row'}
				wrap={'wrap'}
				gap={'xl'}>
				{images.map((image: wallpaper) => (
					<div
						key={Math.random()}
						className={styles.wrapper}
						onClick={() => {
							// This should open the <Lightbox />
						}}>
						<BackgroundImage
							className={styles.image}
							src={image.src}>
							<Stack
								className={`${styles.fade} ${styles.image_stack}`}
								p={10}
								justify={'space-between'}>
								<Text
									size={'sm'}
									align="right">{`${image.resolution.width}x${image.resolution.height}`}</Text>
								<Stack>
									<Text size={'sm'} className={styles.author}>
										{image.author}
									</Text>
									<Text size={'lg'}>{image.title}</Text>
								</Stack>
							</Stack>
						</BackgroundImage>
					</div>
				))}
				{loading}
			</Flex>
			<Text>You&apos;ve made it to the end! 🥳</Text>
		</>
	);
};

export default Umbraeus;
