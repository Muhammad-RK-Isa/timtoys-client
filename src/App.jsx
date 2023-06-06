import { Outlet } from "react-router-dom";
import Header from './Shared/Header/Header';
import Footer from "./Shared/Footer/Footer";
import SidePanel from "./Shared/SidePanel/SidePanel";
import { useContext } from "react";
import { UserContext } from "./Providers/AuthProvider/AuthProvider";
import { Transition } from '@headlessui/react';
import LoginPopUp from "./Pages/LoginPopUp/LoginPopUp";
import ProductDetailsModal from './Pages/ProductDetailsModal/ProductDetailsModal';
import Loader from "./Shared/Loader/Loader";

const App = () => {

  const { isToggled } = useContext( UserContext );

  return (
    <>
      <Header />
      <SidePanel />
      <Transition
        show={ isToggled }
        enter="transition-opacity duration-400 ease-in-out"
        enterFrom="bg-opacity-0"
        enterTo="bg-opacity-40"
        leave="transition-opacity duration-400 ease-in-out"
        leaveFrom="bg-opacity-40"
        leaveTo="bg-opacity-0"
        className='bg-black backdrop-blur-sm fixed w-screen h-[200vh] z-[20000]'
      >
      </Transition>
      <div className={ `mt-20 px-4 md:px-0 max-w-screen-2xl mx-auto` }>
        <Outlet />
      </div>
      <LoginPopUp />
      <ProductDetailsModal />
      <Loader />
      <Footer />
    </>
  );
};

export default App;