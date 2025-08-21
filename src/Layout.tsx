import type { ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="layout-container">
        <SideBar />
        {children}
      </main>
    </div>
  );
};
