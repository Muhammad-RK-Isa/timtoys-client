import { Carousel } from "@material-tailwind/react";
import bannerImg1 from '../../assets/Images/robot1.webp';
import bannerImg2 from '../../assets/Images/robot2.jpg';
import bannerImg3 from '../../assets/Images/robot3.jpg';
import { useEffect } from "react";
import Aos from "aos";

const Banner = () => {

    useEffect(() => {
        Aos.init();
    }, [])
    

    return (
        <div data-aos="zoom-out" className="rounded md:rounded-xl h-48 md:h-72 lg:h-96 w-full overflow-hidden mb-10 relative bg-white">

            {/* Gradient Shade */ }
            <div className="absolute w-2/3 h-full z-50 bg-gradient-to-r from-[#090c087e] to-transparent pointer-events-none" />

            <Carousel
                autoplay={ true }
                loop={ true }
                autoplayDelay={ 4000 }
                className="rounded md:rounded-xl text-base-100 h-[28rem] md:h-72 lg:h-96"
                navigation={ ( { setActiveIndex, activeIndex, length } ) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        { new Array( length ).fill( "" ).map( ( _, i ) => (
                            <span
                                key={ i }
                                className={ `block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${ activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                                    }` }
                                onClick={ () => setActiveIndex( i ) }
                            />
                        ) ) }
                    </div>
                ) }
            >
                <div className="relative md:static h-48 md:h-72 lg:h-96 bg-white grid grid-cols-2 md:grid-cols-3 items-center overflow-hidden">
                    <div className="absolute md:static md:col-span-2 flex flex-col md:justify-center gap-4 md:gap-8 lg:p-8 pt-4 pl-4 lg:pl-16 h-full text-base-100 z-10">
                        <h1 className="text-lg lg:text-5xl font-bold lg:leading-snug">
                            Gear Up for Adventure with Cutting-Edge Robot Toys!
                        </h1>
                        <p className="lg:text-2xl md:font-semibold w-1/2 md:w-full">
                            Experience Innovation and Excitement at Your Fingertips
                        </p>
                    </div>
                    <img
                        src={ bannerImg1 }
                        alt="image 1"
                        className="absolute right-2 md:static bottom-0 md:col-start-3 h-40 lg:h-[20rem] object-contain"
                    />
                </div>
                <div className="relative md:static h-48 md:h-72 lg:h-96 bg-white grid grid-cols-2 md:grid-cols-3 items-center overflow-hidden">
                    <div className="absolute md:static md:col-span-2 flex flex-col md:justify-center gap-4 md:gap-8 lg:p-8 pt-4 pl-4 lg:pl-16 h-full text-base-100 z-10">
                        <h1 className="text-lg lg:text-5xl font-bold lg:leading-snug">
                            Immerse Yourself in Robotic Marvels!
                        </h1>
                        <p className="lg:text-2xl md:font-semibold w-1/2 md:w-full">
                            Discover the Perfect Robot Toy for Every Robo-Enthusiast.
                        </p>
                    </div>
                    <img
                        src={ bannerImg2 }
                        alt="image 1"
                        className="absolute right-0 md:static md:col-start-3 h-40 lg:h-[20rem] object-contain"
                    />
                </div>
                <div className="relative bg-white h-48 md:h-72 lg:h-96 grid grid-cols-2 md:grid-cols-3 items-center overflow-hidden">
                    <div className="absolute md:static md:col-span-2 flex flex-col md:justify-center gap-2 md:gap-8 lg:p-8 pt-3 pl-4 lg:pl-16 h-full box-border text-base-100 z-10">
                        <h1 className="text-lg lg:text-5xl w-3/4 md:w-full font-bold lg:leading-snug">
                            From Playtime to Imagination, Robotic Fun Awaits!
                        </h1>
                        <p className="lg:text-2xl md:font-semibold w-1/2 md:w-full">
                            Find Your Perfect Robotic Companion Here.
                        </p>
                    </div>
                    <img
                        src={ bannerImg3 }
                        alt="image 1"
                        className="absolute right-0 top-0 md:col-start-3 h-48 md:h-[25rem] object-contain"
                        style={ { transform: "scaleX(-1)" } }
                    />
                </div>
                {/* <div className="relative bg-white h-96 grid grid-cols-3 items-center">
                    <div className="flex flex-col justify-center gap-8 p-8 pl-16 absolute top-0 left-0 w-2/3 h-full ">
                        <h1 className="text-5xl font-bold leading-snug">
                        </h1>
                        <p className="text-2xl font-semibold">
                        </p>
                    </div>
                    <img
                        src={ bannerImg2 }
                        alt="image 1"
                        className="col-start-3 h-[20rem] object-contain"
                    />
                </div>
                <div className="relative bg-white h-96 grid grid-cols-3 items-center overflow-hidden">
                    <div className="flex flex-col justify-center gap-8 p-8 pl-16 absolute top-0 left-0 w-2/3 h-full ">
                        <h1 className="text-5xl font-bold leading-snug">
                        </h1>
                        <p className="text-2xl font-semibold">
                        </p>
                    </div>
                    <img
                        src={ bannerImg3 }
                        alt="image 1"
                        
                    />
                </div> */}
            </Carousel>
        </div>
    );
};
export default Banner;