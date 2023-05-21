import React, { useContext } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const ProductDetails = () => {

    const { user } = useContext( UserContext );

    const productData = useLoaderData();

    if ( productData ) {
        const { title, thumbnailImage, price, listPrice, inStock, category, description, sellerAttributes, attributes } = productData;

        return (
            <div>
                {title}
            </div>
        );
    }

};

export default ProductDetails;