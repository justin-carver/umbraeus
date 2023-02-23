import { useHover } from '@mantine/hooks';
import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Container, Title, Group, Text, Stack, Image } from '@mantine/core';

import styles from '@/styles/Lightbox.module.css';

const Lightbox = (props: any) => {
	const { hovered, ref } = useHover();

	return (
		<>
			<div
				className={`${styles.lightbox_bg} ${
					props.showLightbox ? styles.show : ''
				}`}></div>
			<Container className={styles.lightbox_wrapper} size={'xl'}>
				<Stack>
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
						<Image
							src={props.image.src}
							alt={props.image.alt}
							withPlaceholder
						/>
						<Group>
							<Stack>
								<Title order={2}>{props.image.title}</Title>
								<Title order={4}>{props.image.author}</Title>
							</Stack>
						</Group>
					</Group>
				</Stack>
			</Container>
		</>
	);
};

export default Lightbox;
