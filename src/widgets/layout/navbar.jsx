import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, brandLogo, routes }) {
  // State untuk membuka dan menutup navbar
  const [openNav, setOpenNav] = React.useState(false);

  // Efek untuk menutup navbar saat ukuran layar lebih besar dari 960px
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Daftar menu navigasi
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes
        .filter((route) => !route.excludeFromNavbar) // Filter halaman yang tidak ada di navbar
        .map(({ name, path }) => (
          <Typography
            key={name}
            as="li"
            variant="small"
            color="inherit"
            className="capitalize text-lg lg:text-xl font-semibold"
          >
            <Link
              to={path}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {name}
            </Link>
          </Typography>
        ))}
    </ul>
  );

  return (
    <MTNavbar
      color="transparent"
      className={`p-3 w-full z-100 text-white ${openNav ? "shadow-lg" : ""}`} // Tambahkan shadow saat nav terbuka
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {brandLogo && (
            <img
              src={brandLogo}
              alt={brandName}
              className="h-10 w-10" // Ukuran logo
            />
          )}
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-xl lg:text-2xl">
            {brandName}
          </Typography>
        </Link>

        {/* Menu navigasi di desktop */}
        <div className="hidden lg:block">{navList}</div>

        {/* Tombol burger untuk mobile */}
        <IconButton
          variant="text"
          size="sm"
          color="blue-gray"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)} // Toggle untuk membuka/menutup navbar
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Menu dropdown untuk mobile */}
      <div
        className={`lg:hidden ${openNav ? "block" : "hidden"}`} // Menu tampil jika openNav true
      >
        {navList}
      </div>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "CARBON CORNER",
  brandLogo: "/img/logo.png", // Default logo di folder public
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  brandLogo: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
