import { Link, type MetaFunction } from '@remix-run/react';
import { mapMetadata, metaTitle } from '~/lib/meta';

export const meta: MetaFunction = () => {
	return mapMetadata({
		title: metaTitle('Page not found'),
		description: 'Webdeveloper and esports enthusiast based in Norway.',
	});
};
export default function ErrorPage() {
	return (
		<div className='h-64 flex justify-center flex-col'>
			<h1 className='text-5xl font-semibold'>
				We can't seem to find this page
			</h1>
			<p>
				Maybe you'd like to go back to the{' '}
				<Link to='/' className='underline'>
					home page
				</Link>
				?
			</p>
		</div>
	);
}
