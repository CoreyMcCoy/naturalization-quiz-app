import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Naturalization Quiz App',
  description: 'Prepare for the US Citizenship test with this quiz app.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} md:w-8/12 px-4 mx-auto`}>
        <Navbar />
        <main className="py-20 max-w-4xl mx-auto text-black">{children}</main>
      </body>
    </html>
  );
}
