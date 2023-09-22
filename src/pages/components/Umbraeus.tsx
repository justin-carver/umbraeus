import { useState, useEffect, useRef } from 'react';
import {
	Flex,
	Text,
	Stack,
	Group,
	BackgroundImage,
	Loader,
	Button,
	HoverCard,
} from '@mantine/core';
import { wallpaper } from '../../types';

import styles from '@/styles/Umbraeus.module.css';
import Lightbox from './Lightbox';
import { AiOutlineInfoCircle } from 'react-icons/ai';

/**
 * Typically for normal resolution thumbnails, 'medium' (m) is preferred.
 */

const Umbraeus = (props: any) => {
	const [images, setImages] = useState<wallpaper[]>([]);
	const [sortedImages, setSortedImages] = useState<wallpaper[]>([]);
	const [selectedImage, setSelectedImage] = useState<{}>();
	const [loading, setLoading] = useState<boolean>(false);
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const [showLightbox, setLightbox] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [sortOption, setSortingOption] = useState<number>(0);

	const sortingOptions: string[] = [
		'Last Uploaded 🗓️',
		'Random 🎲',
		// 'Most Downloaded 🤩',
	];

	let lastScrollTime = 0;
	const throttleDuration = 200; // milliseconds

	const handleScroll = () => {
		const now = new Date().getTime();

		if (now - lastScrollTime < throttleDuration) return;

		lastScrollTime = now;

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
		setIsSorting(true);
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

		if (isSorting) {
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

			setIsSorting(false);
		}
		setSortedImages(sorted);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortOption, images]);

	useEffect(() => {
		loadImages(pageNumber);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hoverRef = useRef<HTMLDivElement>(null);

	return (
		<>
			{showLightbox && (
				<Lightbox
					showLightbox={showLightbox}
					setLightbox={setLightbox}
					image={selectedImage}
				/>
			)}
			<Group spacing={10}>
				<Button
					className={styles.sort_button}
					color="gray"
					size={'md'}
					onClick={() => sortingButton()}>
					{`Sorting by ${sortingOptions[sortOption]}`}
				</Button>
				<HoverCard
					shadow={'xl'}
					withArrow
					offset={10}
					width={350}
					position="right">
					<HoverCard.Target>
						<div ref={hoverRef}>
							<AiOutlineInfoCircle size={28} />
						</div>
					</HoverCard.Target>
					<HoverCard.Dropdown>
						<Text size={'sm'} align="center">
							I created a backend tool to help me upload these
							beautiful wallpapers easily and without hassle! Best
							of all, it&apos;s open source!
							<br />
							<br />✨ Check out{' '}
							<a
								href="https://github.com/justin-carver/umbravault/"
								className={styles.url}>
								UmbraVault! ✨
							</a>
						</Text>
					</HoverCard.Dropdown>
				</HoverCard>
			</Group>
			<Text size={'xs'} w={450} align={'center'} className={styles.info}>
				These wallpapers are updated over an unspecified period of time,
				at my personal discretion. Check back later for more! I&apos;ll
				fix the broken links as reported.
			</Text>
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
