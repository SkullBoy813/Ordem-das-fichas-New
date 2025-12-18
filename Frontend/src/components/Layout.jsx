import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

