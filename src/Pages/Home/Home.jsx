import React, { createContext } from 'react';
import Slider from './Slider';
import SidebarLeft from './SidebarLeft';
import CategoryTabs from './CategoryTabs';

const Home = () => {
    const ProductsContext = createContext();
    return (
        <section className='grid md:grid-cols-5'>
            <SidebarLeft />
            <div className='col-start-2 col-span-3'>
                <Slider />
                <div className="divider my-8"></div>
            </div>
            <div className='col-start-2 row-start-2 col-span-3'>
                <CategoryTabs />
            </div>
        </section>
    );
};

export default Home;