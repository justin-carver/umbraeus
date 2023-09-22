import React, { useState, useEffect } from 'react';
import { useHover, useScrollLock } from '@mantine/hooks';
import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import {
	Overlay,
	Center,
	Title,
	Group,
	Stack,
	Skeleton,
	Image,
} from '@mantine/core';

import styles from '@/styles/Lightbox.module.css';

const Lightbox = (props: any) => {
	const { hovered, ref } = useHover();
	const [isLoading, setIsLoading] = useState(true);
	const [, setLockState] = useScrollLock(false);

	useEffect(() => {
		setLockState((prevState) => !prevState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!props.image) return;

		const img = document.createElement('img');
		img.src = props.image.src;
		img.onload = () => {
			setIsLoading(false);
			
		};
	}, [props.image]);

	const handleClose = () => props.setLightbox(!props.showLightbox);

	return (
		<>
			<Overlay className={styles.overlay} color="#000" opacity={0.7} />
			<Center className={styles.lightbox_wrapper}>
				<Stack className={styles.stack}>
					<Group className={styles.close} position={'right'}>
						<div ref={ref} onClick={handleClose}>
							{hovered ? (
								<AiFillCloseCircle size={42} />
							) : (
								<AiOutlineCloseCircle size={42} />
							)}
						</div>
					</Group>
					<Group className={styles.lightbox}>
						{isLoading ? (
							<Skeleton visible width={'100%'}>
								<div className={styles.placeholder} />
							</Skeleton>
						) : (
							props.image && (
								<>
									<Image
										src={props.image.src}
										alt={props.image.alt}
										withPlaceholder
										placeholder={
											<div
												className={styles.placeholder}
											/>
										}
									/>
									<Group>
										<Stack>
											<Title order={2}>
												{props.image.title}
											</Title>
											<Title order={4}>
												{props.image.author}
											</Title>
										</Stack>
									</Group>
								</>
							)
						)}
					</Group>
				</Stack>
			</Center>
		</>
	);
};

export default Lightbox;
