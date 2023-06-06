import { createContext, useContext, useEffect } from "react";
import Banner from "./Banner";
import Category from "./Category";
import CategoryTabs from "./CategoryTabs";
import Home_products from "./Home_products";
import { scrollToTopOnRender } from "../../Utils";
import { Toaster, toast } from "react-hot-toast";
import Pinned_Blogs from "./Pinned_Blogs";
import ImageGallery from "./ImageGallery";

export const HomeContext = createContext();

const Home = () => {

    useEffect( () => {
        scrollToTopOnRender();
    }, [] );


    const showToast = () => toast.error( 'Please login to view this content!' );

    const props = {
        showToast
    };

    return (
        <HomeContext.Provider value={ props }>
            <section>
                <Banner />
                <ImageGallery />
                <Home_products />
                <Category />
                <CategoryTabs />
                <Pinned_Blogs />
                <Toaster
                    position="top-center"
                    toastOptions={ {
                        duration: 2000
                    } }
                />
            </section>
        </HomeContext.Provider>
    );
};

export default Home;