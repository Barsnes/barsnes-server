import {
	Links,
	Meta,
	type MetaFunction,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import './tailwind.css';
import './layout.css';
import BackgroundLines from './components/background-lines';
import { Cursor } from './components/cursor-circle';
export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Cantata+One&display=swap',
	},
];

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Tobias Barsnes',
			description: 'Webdeveloper and esports enthusiast based in Norway.',
			image: '/images/meta.png',
		},
		{
			name: 'google-adsense-account',
			content: 'ca-pub-6482501953820040',
		},
	];
};

const linkClasses =
	'text-xl font-semibold py-4 px-6 border-white border-r-2 underline hover:no-underline hover:text-black hover:bg-white focus-visible:no-underline focus-visible:text-black focus-visible:bg-white h-16';

const unactiveClasses = 'text-white no-underline';
const activeClasses = 'text-black bg-white no-underline';

const navLinks = [{ to: '/about', text: 'About' }];

export function Layout() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
				<Meta />
				<Links />
			</head>
			<body>
				<nav
					className='flex items-center align-center
        bg-black text-white font-semibold
        border-b-2 border-white
        '
				>
					<NavLink
						to='/'
						className={({ isActive }): string =>
							`${linkClasses} ${isActive ? activeClasses : unactiveClasses}`
						}
					>
						<img src='/logo.png' alt='Logo' className='h-8' />
					</NavLink>
					{navLinks.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							className={({ isActive }): string =>
								`${linkClasses} ${isActive ? activeClasses : unactiveClasses}`
							}
						>
							{link.text}
						</NavLink>
					))}
				</nav>
				<div
					className='
          pt-8
          bg-black
          text-white
					min-h-screen
					mx-auto w-full max-w-7xl px-4 md:px-6
					pb-8
        '
				>
					<Outlet />
					<Cursor />
				</div>
				<footer className='brutalist-footer'>
					<div className='max-w-7xl mx-auto px-4 md:px-6 py-16'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
							<div>
								<h3 className='footer-heading'>Tobias Barsnes</h3>
								<p className='footer-text'>
									Web developer and esports enthusiast based in Norway.
								</p>
							</div>
							<div>
								<h3 className='footer-heading'>Connect</h3>
								<ul className='footer-links'>
									<li>
										<a
											href='https://github.com/barsnes'
											target='_blank'
											rel='noopener noreferrer'
										>
											GitHub
										</a>
									</li>
									<li>
										<a
											href='https://twitter.com/torskencs'
											target='_blank'
											rel='noopener noreferrer'
										>
											Twitter
										</a>
									</li>
									<li>
										<a
											href='https://www.linkedin.com/in/t-barsnes/'
											target='_blank'
											rel='noopener noreferrer'
										>
											LinkedIn
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className='footer-heading'>Navigation</h3>
								<ul className='footer-links'>
									<li>
										<a href='/'>Home</a>
									</li>
									<li>
										<a href='/about'>About</a>
									</li>
									<li>
										<a href='/posts'>Posts</a>
									</li>
								</ul>
							</div>
						</div>
						<div className='footer-bottom'>
							<p>
								© {new Date().getFullYear()} Tobias Barsnes. All rights
								reserved.
							</p>
						</div>
					</div>
				</footer>
				<BackgroundLines />
				<ScrollRestoration />
				<Scripts />
				<script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6482501953820040'
					crossOrigin='anonymous'
				/>
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);
	return (
		<html lang='en'>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				{/* add the UI you want your users to see */}
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
