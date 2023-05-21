import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";

const Slider = () => {

    const { setCategory } = useContext( UserContext );

    const [ dataSet1, setDataSet1 ] = useState( null );
    const [ dataSet2, setDataSet2 ] = useState( null );
    const [ dataSet3, setDataSet3 ] = useState( null );

    useEffect( () => {
        const requestdata = async ( category, dataSet ) => {
            try {
                const response = await fetch( `https://tim-toys-server.vercel.app/products/random?quantity=3&category=${ encodeURIComponent( category ) }` );
                const data = await response.json();
                dataSet( data );
            } catch ( error ) {
                console.log( error );
            }
        };

        requestdata( 'Preschool', setDataSet1 );
        requestdata( 'Novelty & Gag Toys', setDataSet2 );
        requestdata( 'Arts & Crafts', setDataSet3 );

    }, [] );

    if ( dataSet1 && dataSet2 && dataSet3 ) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-5xl mx-4 md:mx-auto my-4 lg:my-6">
                <div className="relative">
                    <Carousel
                        className="rounded-xl h-64 md:h-72 border-2"
                        prevArrow={ ( { handlePrev } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handlePrev }
                                className="!absolute top-2/4 -translate-y-2/4 left-4"
                            >
                                <ArrowLeftIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                        nextArrow={ ( { handleNext } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handleNext }
                                className="!absolute top-2/4 -translate-y-2/4 !right-4"
                            >
                                <ArrowRightIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                    >
                        {
                            dataSet1.map( ( product ) => {
                                return <img key={ product._id } src={ product.thumbnailImage } alt="carousel-image" className="h-full w-full object-cover" />;
                            } )
                        }
                    </Carousel>
                    <button
                        className="absolute top-2 left-2 md:left-3 md:top-3 text-white font-bold bg-accent bg-opacity-40 p-2 rounded"
                        onClick={ () => { setCategory( dataSet1[ 0 ].category ); } }
                    >
                        { dataSet1[ 0 ].category }
                    </button>
                </div>
                <div className="relative hidden md:flex">
                    <Carousel
                        className="rounded-xl h-64 md:h-72 border-2"
                        prevArrow={ ( { handlePrev } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handlePrev }
                                className="!absolute top-2/4 -translate-y-2/4 left-4 "
                            >
                                <ArrowLeftIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                        nextArrow={ ( { handleNext } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handleNext }
                                className="!absolute top-2/4 -translate-y-2/4 !right-4"
                            >
                                <ArrowRightIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                    >
                        {
                            dataSet2.map( ( product ) => {
                                return <img key={ product._id } src={ product.thumbnailImage } alt="carousel-image" className="h-full w-full object-cover" />;
                            } )
                        }
                    </Carousel>
                    <button
                        className="absolute top-2 left-2 md:left-3 md:top-3 text-white font-bold bg-accent bg-opacity-40 p-2 rounded"
                        onClick={ () => { setCategory( dataSet2[ 0 ].category ); } }
                    >
                        { dataSet2[ 0 ].category }
                    </button>
                </div>
                <div className="relative hidden lg:flex">
                    <Carousel
                        className="rounded-xl h-64 md:h-72 border-2"
                        prevArrow={ ( { handlePrev } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handlePrev }
                                className="!absolute top-2/4 -translate-y-2/4 left-4 bg-white bg-opacity-25"
                            >
                                <ArrowLeftIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                        nextArrow={ ( { handleNext } ) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={ handleNext }
                                className="!absolute top-2/4 -translate-y-2/4 !right-4"
                            >
                                <ArrowRightIcon strokeWidth={ 2 } className="w-6 h-6 flex" />
                            </IconButton>
                        ) }
                    >
                        {
                            dataSet3.map( ( product ) => {
                                return <img key={ product._id } src={ product.thumbnailImage } alt="carousel-image" className="h-full w-full object-cover" />;
                            } )
                        }
                    </Carousel>
                    <button
                        className="absolute top-2 left-2 md:left-3 md:top-3 text-white font-bold bg-accent bg-opacity-40 p-2 rounded"
                        onClick={ () => { setCategory( dataSet3[ 0 ].category ); } }
                    >
                        { dataSet3[ 0 ].category }
                    </button>
                </div>
            </div>
        );
    }
};

export default Slider;