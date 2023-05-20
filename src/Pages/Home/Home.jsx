import React from 'react';
import Slider from './Slider';

const Home = () => {
    return (
        <section className='grid md:grid-cols-5'>
            <div className='col-start-2 col-span-3'>
                <Slider />
            </div>
        </section>
    );
};

export default Home;