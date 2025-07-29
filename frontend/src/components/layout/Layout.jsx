import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo con ondas */}
      <div className="wave-container absolute top-0 left-0 w-full h-full -z-10">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>

      {/* Contenido general */}
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-grow pt-[80px] px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
