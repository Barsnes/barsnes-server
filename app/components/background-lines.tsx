export default function BackgroundLines() {
	return (
		<div className='pointer-events-none absolute inset-0 flex justify-center h-full'>
			<div className='hidden h-full w-full max-w-7xl grid-cols-3 gap-3.5 px-4 sm:grid'>
				<div className='border-x border-white/[0.035]' />
				<div className='border-x border-white/[0.035]' />
				<div className='border-x border-white/[0.035]' />
			</div>
		</div>
	);
}
