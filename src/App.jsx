import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Footer from "@/widgets/layout/Footer"; // Import Footer component

function App() {
  return (
    <>
      {/* Navbar */}
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} />
      </div>

      {/* Routing */}
      <Routes>
        {routes.map(({ path, element }, key) =>
          element ? <Route key={key} exact path={path} element={element} /> : null
        )}
        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
