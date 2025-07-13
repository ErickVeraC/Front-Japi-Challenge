import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}
