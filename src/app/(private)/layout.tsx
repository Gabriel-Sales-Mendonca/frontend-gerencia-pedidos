'use client'

import Header from "../components/Header";
import Menu from "../components/Menu";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex overflow-hidden mt-16">
        <Menu />
        <div className="bg-neutral-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
