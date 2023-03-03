import { useState, useEffect } from 'react';
import { Flex, Text, Stack, BackgroundImage } from '@mantine/core';
import { wallpaper } from '../../types';

import styles from '@/styles/Umbraeus.module.css';
import Lightbox from './Lightbox';

/**
 * Typically for normal resolution thumbnails, 'medium' (m) is preferred.
 */

// TODO: At some point, the image should become a separate component.

const Umbraeus = (props: any) => {
	const [images, setImages] = useState<wallpaper[]>([]);
	const [selectedImage, setSelectedImage] = useState<{}>();
	const [loading, setLoading] = useState(false);
	const [showLightbox, setLightbox] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } =
			document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
			setPageNumber((prevPageNumber) => prevPageNumber + 1);
		}
	};

	const handleImageClick = () => {
		props.showAffix(true);
		setLightbox(true);
	};

	// Strictly for Imgur related URL requests.
	const regulateResolution = (str: string, letter: string): string => {
		const lastPeriodIndex = str.lastIndexOf('.');
		if (lastPeriodIndex === -1) {
			return str;
		} else {
			return (
				str.slice(0, lastPeriodIndex) +
				letter +
				str.slice(lastPeriodIndex)
			);
		}
	};

	const loadImages = (page: number) => {
		setLoading(true);
		fetch(`/api/queryWallpapers?page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.documents) {
					setImages((prevImages) => [
						...prevImages,
						...data.documents,
					]);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (pageNumber > 1) {
			loadImages(pageNumber);
		}
	}, [pageNumber]);

	useEffect(() => {
		loadImages(pageNumber);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			{showLightbox && (
				<Lightbox
					showLightbox={showLightbox}
					setLightbox={setLightbox}
					image={selectedImage}
				/>
			)}
			<Flex
				align={'end'}
				justify={'flex-start'}
				direction={'row'}
				wrap={'wrap'}
				gap={'xl'}>
				{images.map((image: wallpaper) => (
					<div
						key={Math.random()}
						className={styles.wrapper}
						onClick={() => {
							handleImageClick();
							setSelectedImage(image);
						}}>
						<BackgroundImage
							className={styles.image}
							src={regulateResolution(image.src, 'l')}>
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
