import { Navbar, Sidebar } from "zstream/ui/components";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex w-screen items-start space-x-6">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
