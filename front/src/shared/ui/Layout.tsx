import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-16 pb-14 overflow-auto w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {children ?? <Outlet />}
      </main>

      <Footer />
    </div>
  );
}
