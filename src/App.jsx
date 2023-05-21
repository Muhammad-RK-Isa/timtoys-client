import { Outlet } from "react-router-dom";
import Header from './Shared/Header/Header';
import Footer from "./Shared/Footer/Footer";
import { Drawer } from "@material-tailwind/react";

const App = () => {
  return (
    <>      
      <Header />
      <div className="h-20 w-full"/>
      <Outlet />
      <Footer />
    </>
  );
};

export default App;