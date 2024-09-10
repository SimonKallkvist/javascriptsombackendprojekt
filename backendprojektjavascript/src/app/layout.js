import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth';
import Auth from '@/components/auth/Auth';
import Navbar from '@/components/navBar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The most awesome inventory',
  description: 'Created by the slimeySajmi',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          {/* <Navbar /> */}
          <Auth />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
