import React, { useEffect, useState } from 'react';
import Aos from 'aos';

const ImageGallery = () => {

    const [ images, setImages ] = useState( null );

    const retrieveImages = async () => {
        try {
            const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/images` );
            const data = await response.json();
            setImages( data );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        retrieveImages();
        Aos.init();

        const interval = setInterval( () => {
            retrieveImages();
        }, 3000 );

        return () => clearInterval( interval );
    }, [] );

    if ( images ) {
        return (
            <div className='grid grid-cols-5 h-44 lg:h-72 gap-2 mb-8'>
                <img data-aos="slide-right" src={ images[ 0 ] } alt="gallery-image" className='rounded object-contain object-center bg-neutral h-44 lg:h-72 w-full' />
                <div className='flex flex-col gap-2 h-44 lg:h-72'>
                    <img data-aos="slide-left" src={ images[ 1 ] } alt="gallery-image" className='rounded object-contain object-center bg-neutral w-full h-full  max-h-[5.4rem] lg:max-h-[8.8rem]' />
                    <img data-aos="slide-left" src={ images[ 2 ] } alt="gallery-image" className='rounded object-contain object-center bg-neutral w-full h-full  max-h-[5.4rem] lg:max-h-[8.8rem]' />
                </div>
                <img data-aos="zoom-out" src={ images[ 3 ] } alt="gallery-image" className='col-span-2 rounded object-contain object-center bg-neutral h-44 lg:h-72 w-full' />
                <img data-aos="slide-left" src={ images[ 4 ] } alt="gallery-image" className='rounded object-contain object-center bg-neutral w-full h-44 lg:h-72' />
            </div>
        );
    }

};

export default ImageGallery;