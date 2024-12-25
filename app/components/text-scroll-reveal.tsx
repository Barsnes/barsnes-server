import {
	useScroll,
	useTransform,
	motion,
	type MotionValue,
} from 'framer-motion';
import { type HTMLAttributes, useRef } from 'react';
import cl from 'clsx/lite';

type ParagraphProps = {
	paragraph: string;
} & HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph({
	paragraph,
	className,
	...rest
}: ParagraphProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start 0.9', 'start 0.35'],
	});

	const words = paragraph.split(' ');
	return (
		<p
			ref={container}
			className={cl('flex text-lg leading-none flex-wrap', className)}
			{...rest}
		>
			{words.map((word, i) => {
				const start = i / words.length;
				const end = start + 1 / words.length;
				return (
					<Word
						key={`${i}-word-${word}`}
						progress={scrollYProgress}
						range={[start, end]}
					>
						{word}
					</Word>
				);
			})}
		</p>
	);
}

const Word = ({
	children,
	progress,
	range,
}: {
	children: string;
	progress: MotionValue<number>;
	range: number[];
}) => {
	const amount = range[1] - range[0];
	const step = amount / children.length;
	return (
		<span className="relative mt-1 after:content-['\00a0'] after:inline">
			{children.split('').map((char, i) => {
				const start = range[0] + i * step;
				const end = range[0] + (i + 1) * step;
				return (
					<Char
						key={`${i}-char-${char}`}
						progress={progress}
						range={[start, end]}
					>
						{char}
					</Char>
				);
			})}
		</span>
	);
};

const Char = ({
	children,
	progress,
	range,
}: {
	children: string;
	progress: MotionValue<number>;
	range: number[];
}) => {
	const opacity = useTransform(progress, range, [0, 1]);
	return (
		<span>
			<span className='absolute opacity-20'>{children}</span>
			<motion.span style={{ opacity: opacity }}>{children}</motion.span>
		</span>
	);
};
