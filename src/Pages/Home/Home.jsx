import React, { createContext } from 'react';
import Slider from './Slider';
import SidebarLeft from './SidebarLeft';
import CategoryTabs from './CategoryTabs';

const Home = () => {
    return (
        <section className='grid md:grid-cols-5 relative'>
            <div className='h-max sticky top-24 left-0'>
                <SidebarLeft />
            </div>
            <div className='md:col-start-2 col-span-3'>
                <Slider />
                <div className="divider my-8"></div>
                <CategoryTabs />
            </div>
        </section>
    );
};

export default Home;