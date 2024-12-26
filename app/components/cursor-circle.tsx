import { type RefObject, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, frame, motion } from 'motion/react';

const WIDTH = 25;

export const Cursor = () => {
	return (
		<>
			<CursorCircleDelay />
		</>
	);
};

const CursorCircleDelay = () => {
	const ref = useRef(null);
	const { x, y } = useFollowPointer(ref, {
		damping: 15,
		stiffness: 90,
		restDelta: 0.001,
	});

	return (
		<>
			<motion.div
				ref={ref}
				className='border-white border-[1px] rounded-full fixed pointer-events-none z-50'
				style={{
					width: WIDTH,
					height: WIDTH,
					borderRadius: '50%',
					backgroundColor: 'transparent',
					position: 'fixed',
					y,
					x,
					pointerEvents: 'none',
					zIndex: 9999,
					/* invert inside */
					mixBlendMode: 'difference',
				}}
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
			/>
		</>
	);
};

type SpringConfig = {
	damping?: number;
	stiffness?: number;
	restDelta?: number;
};

export function useFollowPointer(
	ref: RefObject<HTMLElement>,
	spring: SpringConfig = { damping: 15, stiffness: 90, restDelta: 0.001 },
) {
	const xPoint = useMotionValue(0);
	const yPoint = useMotionValue(0);
	const x = useSpring(xPoint, spring);
	const y = useSpring(yPoint, spring);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!ref.current) return;

		const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
			const element = ref.current as HTMLElement;

			frame.read(() => {
				xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
				yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener('pointermove', handlePointerMove);

		return () => window.removeEventListener('pointermove', handlePointerMove);
	}, [ref]);

	return { x, y };
}
