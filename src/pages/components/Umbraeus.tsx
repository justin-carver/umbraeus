import { useState, useEffect } from 'react';
import {
	Flex,
	Text,
	Stack,
	BackgroundImage,
	Loader,
	Button,
} from '@mantine/core';
import { wallpaper } from '../../types';
import { AiFillSmile } from 'react-icons/ai';

import styles from '@/styles/Umbraeus.module.css';
import Lightbox from './Lightbox';

/**
 * Typically for normal resolution thumbnails, 'medium' (m) is preferred.
 */

// TODO: At some point, the image should become a separate component.
// TODO: Add randomize sort button, remember that with local storage.

const Umbraeus = (props: any) => {
	const [images, setImages] = useState<wallpaper[]>([]);
	const [sortedImages, setSortedImages] = useState<wallpaper[]>([]);
	const [selectedImage, setSelectedImage] = useState<{}>();
	const [loading, setLoading] = useState<boolean>(false);
	const [showLightbox, setLightbox] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [sortOption, setSortingOption] = useState<number>(0);

	const sortingOptions: string[] = [
		'Last Uploaded 🗓️',
		'Random 🎲',
		'Most Downloaded 🤩',
	];

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } =
			document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 300 && !loading) {
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

	const sortingButton = () => {
		setSortingOption((prev) => (prev + 1) % sortingOptions.length);
	};

	useEffect(() => {
		if (pageNumber > 1) {
			loadImages(pageNumber);
		}
	}, [pageNumber]);

	useEffect(() => {
		if (!images || images.length === 0) return;

		let sorted: wallpaper[] = [...images];

		// Check sortingOptions defined above
		sorted.sort((a, b) => {
			switch (sortOption) {
				case 1:
					return 0.5 - Math.random();
				case 2:
					return b.downloads - a.downloads;
				default:
					return 0;
			}
		});

		setSortedImages(sorted);
	}, [sortOption, images]);

	useEffect(() => {
		loadImages(pageNumber);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<Button
				className={styles.sort_button}
				color="gray"
				size={'md'}
				onClick={() => sortingButton()}>
				{`Sorting by ${sortingOptions[sortOption]}`}
			</Button>
			<Flex
				align={'end'}
				justify={'flex-start'}
				direction={'row'}
				wrap={'wrap'}
				gap={'xl'}>
				{sortedImages.map((image: wallpaper) => (
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
			</Flex>
			{!loading ? (
				<Stack p={'xl'} spacing={'xl'}>
					<Text>You made it to the end! 🥳</Text>
				</Stack>
			) : (
				<>
					<Loader size={60} color="gray" type="dots" />
					<Text>Fetching dark wallpapers, hang tight!</Text>
				</>
			)}
		</>
	);
};

export default Umbraeus;
