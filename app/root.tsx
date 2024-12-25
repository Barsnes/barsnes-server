import {
  Links,
  Meta,
  MetaFunction,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import "./layout.css";
import { Cursor } from "./components/Cursor";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    {
      title: "Tobias Barsnes",
    },
  ];
};

{
  /* navlinks should be huge and brutalist */
}
const linkClasses =
  "text-xl font-semibold py-4 px-6 border-white border-r-2 underline hover:no-underline hover:text-black hover:bg-white h-16";

const unactiveClasses = "text-white no-underline";
const activeClasses = "text-black bg-white no-underline";

const navLinks = [
  { to: "/about", text: "About" },
  { to: "/blog", text: "Blog" },
];

export function Layout() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* favicon */}
        <link rel='icon' href='/favicon.ico' />
        <Meta />
        <Links />
      </head>
      <body>
        {/* make the nav brutalist style */}
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
        {/* should be brutalist */}
        <div
          className='
          pt-8
          bg-black
          text-white
        '
        >
          <Outlet />
          <Cursor />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
