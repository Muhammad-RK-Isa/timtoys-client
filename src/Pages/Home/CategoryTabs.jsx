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

const CategoryTabs = () => {

    const { subCategories, products, setCategory } = useContext( UserContext );

    useEffect( () => {
        setCategory( 'Novelty & Gag Toys' );
    }, [] );

    if ( products && subCategories.length !== 0 ) {
        return (
            <div className="hidden md:block">
                <Tabs value={ subCategories[ 0 ] }>
                    <TabsHeader>
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
                        className="grid grid-cols-2 gap-4 h-screen overflow-scroll overflow-x-hidden"
                    >
                        {
                            products.map( ( { subCategory, title, thumbnailImage, price, _id } ) => (
                                <TabPanel key={ title } value={ subCategory }>
                                    <div className="card card-compact h-96 w-96 bg-base-100 shadow-sm border rounded-md">
                                        <figure>
                                            <img src={ thumbnailImage } alt="Shoes" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title text-base line-clamp-3">{ title }</h2>
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-2xl">{ `$` + price.value }</p>
                                                <Link to={ `/product/${ _id }` }>
                                                    <button className="btn btn-primary">Buy Now</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            ) ) }
                    </TabsBody>
                </Tabs>
            </div>
        );
    };
};


export default CategoryTabs;