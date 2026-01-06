import { Header, Footer } from "@/components/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
