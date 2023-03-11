import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition } from '@mantine/core';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollToTop = (props: any) => {
	const [scroll, scrollTo] = useWindowScroll();

	return (
		<Affix
			position={{ bottom: 50, right: 50 }}
			hidden={props.affix}
			style={{
				boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.2)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}>
			<Transition transition="slide-up" mounted={scroll.y > 10}>
				{(transitionStyles) => (
					<Button
						leftIcon={<AiOutlineArrowUp />}
						color={'dark'}
						size={'md'}
						style={transitionStyles}
						onClick={() => scrollTo({ y: 0 })}>
						Scroll to top
					</Button>
				)}
			</Transition>
		</Affix>
	);
};

export default ScrollToTop;
