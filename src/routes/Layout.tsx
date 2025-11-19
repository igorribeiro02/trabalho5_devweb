import { Outlet } from "react-router-dom";
// Importe a NavBar que já criamos
import NavBar from "../components/NavBar"; 

const Layout = () => {
  return (
    <>
      {/* 1. A NavBar fica no topo, em todas as páginas */}
      <NavBar />

      {/* 2. O <Outlet /> é onde o router vai renderizar a página 
             correspondente à URL (ex: HomePage, InscricaoPage, etc.) */}
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;