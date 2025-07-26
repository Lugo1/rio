import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Navbar />
      <main className="pt-20 px-4">
        <Outlet /> {/* Aquí sí se renderizan las páginas internas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

