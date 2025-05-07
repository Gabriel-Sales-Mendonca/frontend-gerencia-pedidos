import Header from "../components/header";
import Menu from "../components/menu";

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
        <div className="overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
