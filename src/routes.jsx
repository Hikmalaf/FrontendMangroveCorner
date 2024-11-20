import { Home, Calculator, TentangCarbon} from "@/pages";  
import AboutMangrovePage from "./pages/mangrove";
import Donasi from "./pages/donasi";
import Peta from "./pages/peta";


export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Kalkulator",
    path: "/calculator",
    element: <Calculator />,
  },
  {
    name: "Peta",
    path: "/peta",
    element: <Peta/>,
  },
  {
    name: "Tentang Carbon",
    path: "/about-us", // Pastikan path sesuai
    element: <TentangCarbon />,
  },
  {
    name: "Donasi Mangrove",
    path: "/donasi", // Pastikan path sesuai
    element: <Donasi />,
    excludeFromNavbar: true,
  },
  {
    name: "About Mangrove",
    path: "/mangrove",
    element: <AboutMangrovePage />,
    excludeFromNavbar: true, // Menandai halaman ini agar dikecualikan dari Navbar
  },
];

export default routes;
