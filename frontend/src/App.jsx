import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import CreateAdvertPage from "./pages/CreateAdvertPage/CreateAdvertPage";
import { Listings } from "./Pages/Listings/Listings";

// alternative to state for passing down to child components
// https://react.dev/reference/react/useContext#usecontext
const Context = createContext();

const NavbarWrapper = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/create-advert",
    element: <CreateAdvertPage />,
  },
  {
    path: "/listings",
    element: <Listings />,
  }
]);

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthStatus(!!token);
  }, []);

  return (
    <Context.Provider value={{ authStatus, setAuthStatus }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

export default App;
