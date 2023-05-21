import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

const CategoryTabs = () => {

    const { subCategories, products, setCategory } = useContext( UserContext );

    useEffect( () => {
        setCategory( 'Novelty & Gag Toys' );
    }, [] );



    if ( products && subCategories.length !== 0 ) {
        return (
            <div>
                <Tabs value={ subCategories[ 0 ] }>
                    <TabsHeader className="grid grid-cols-2 md:flex">
                        { subCategories.map( ( subCategory ) => (
                            <Tab key={ subCategory } value={ subCategory }>
                                { subCategory }
                            </Tab>
                        ) ) }
                    </TabsHeader>
                    <TabsBody
                        animate={ {
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        } }
                        className="grid grid-cols-2 md:grid-cols-3 gap-2 pr-8"
                    >
                        {
                            products.map( ( { subCategory, title, thumbnailImage, price, listPrice, _id } ) => (
                                <TabPanel key={ title } value={ subCategory }>
                                    <Link to={ `/product/${ _id }` } className="card card-compact w-44 h-52 md:h-72 md:w-72 mx-auto md:mx-0 bg-base-100 shadow-sm border rounded-md">
                                        <figure>
                                            <img src={ thumbnailImage } alt="Shoes" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title text-base line-clamp-2 md:line-clamp-3">{ title }</h2>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center justify-between md:justify-normal gap-2 w-full md:w-max">
                                                    <p className="font-bold text-xl md:text-2xl">{ `$` + price.value }</p>
                                                    {
                                                        listPrice?.value &&
                                                        <p className="font-bold text link-error line-through">{ `$` + listPrice.value }</p>
                                                    }
                                                </div>
                                                <button className="btn btn-xs btn-primary gap-2 rounded-md hidden md:inline-flex">
                                                    More Info
                                                    <BiRightArrowAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </TabPanel>
                            ) ) }
                    </TabsBody>
                </Tabs>
            </div>
        );
    };
};


export default CategoryTabs;