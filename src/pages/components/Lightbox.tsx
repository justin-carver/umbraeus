import { useState } from 'react';
import { useHover } from '@mantine/hooks';
import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Overlay, Center, Title, Group, Stack, Image } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useEffect } from 'react';

import styles from '@/styles/Lightbox.module.css';

const Lightbox = (props: any) => {
	const { hovered, ref } = useHover();
	const [visible, setVisible] = useState(true);
	const [scrollLock, setLockState] = useScrollLock(false);

	useEffect(() => {
		setLockState((c) => !c);
	}, [visible]);

	return (
		<>
			{visible && (
				<Overlay
					className={styles.overlay}
					color="#000"
					opacity={0.7}
				/>
			)}
			<Center className={styles.lightbox_wrapper}>
				<Stack className={styles.stack}>
					<Group className={styles.close} position={'right'}>
						<div
							ref={ref}
							onClick={() =>
								props.setLightbox(!props.showLightbox)
							}>
							{hovered ? (
								<AiFillCloseCircle size={42} />
							) : (
								<AiOutlineCloseCircle size={42} />
							)}
						</div>
					</Group>
					<Group className={styles.lightbox}>
						{props.image !== undefined && (
							<Image
								src={props.image.src}
								alt={props.image.alt}
								withPlaceholder
								placeholder={
									<div className={styles.placeholder}></div>
								}
							/>
						)}
						<Group>
							<Stack>
								{props.image !== undefined && (
									<>
										<Title order={2}>
											{props.image.title}
										</Title>
										<Title order={4}>
											{props.image.author}
										</Title>
									</>
								)}
							</Stack>
						</Group>
					</Group>
				</Stack>
			</Center>
		</>
	);
};

export default Lightbox;
