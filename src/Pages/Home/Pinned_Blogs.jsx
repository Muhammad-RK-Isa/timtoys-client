import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import Aos from 'aos';

const Pinned_Blogs = () => {

    const { user } = useContext( UserContext );
    const [ pinnedBlogs, setPinnedBlogs ] = useState( [] );

    useEffect( () => {
        (
            async () => {
                if ( user ) {
                    try {
                        const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/user/blogs/${ user.uid }`, {
                            method: 'GET',
                            headers: {
                                authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                            }
                        } );
                        const blog_ids = await response.json();
                        if ( Array.isArray( blog_ids ) ) {
                            try {
                                const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/blogs/all` );
                                const blogs = await response.json();
                                const retrievePinnedBlogs = await blogs.filter( ( blog ) => blog_ids.includes( blog._id ) );
                                setPinnedBlogs( retrievePinnedBlogs );
                            } catch ( error ) {

                            }
                        }
                    } catch ( error ) {
                        console.log( error );
                    }
                }
            }
        )();

        Aos.init();
    }, [ user ] );

    return (
        <div>
            <h1 className="text-2xl font-semibold pt-6 mb-8">Pinned Blogs</h1>
            <div className="flex flex-col gap-8 mb-8">
                {
                    user ?
                        pinnedBlogs.map( ( { _id, question, answer } ) => {
                            return (
                                <div key={ _id } className="flex flex-col gap-4 rounded border-primary border-2 p-4" data-aos="fade-up">
                                    <h3 className="lg:text-xl font-bold">{ question }</h3>
                                    <p className='text-xs lg:text-base'>{ answer }</p>
                                </div>
                            );
                        } )
                        :
                        <h3 className="text-xl lg:text-4xl font-bold">Login to see your pinned blogs here.</h3>
                }
            </div>
        </div>
    );
};

export default Pinned_Blogs;