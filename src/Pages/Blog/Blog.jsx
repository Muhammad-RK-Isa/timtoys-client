import { useLoaderData } from "react-router-dom";
import { BsPinFill, BsPinAngle } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { Tooltip } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import Aos from "aos";
import { scrollToTopOnRender } from "../../Utils";


const Blog = () => {

    const { user, setLoading } = useContext( UserContext );
    const blogs = useLoaderData();
    const [ pinnedBlogs, setPinnedBlogs ] = useState( [] );

    const handlePinUnpin = async ( _id ) => {
        if ( user ) {
            if ( pinnedBlogs.some( ( blog ) => blog === _id ) ) {
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/user/blogs`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                        },
                        body: JSON.stringify( {
                            userId: user?.uid,
                            blogId: _id
                        } )
                    } );
                    if ( response.ok ) {
                        toast.success( "Blog unpinned." );
                        getPinnedBlogs();
                    }
                } catch ( error ) {
                    console.log( error );
                }
                console.log( "is pinned" );
            } else {
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/user/blogs`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                        },
                        body: JSON.stringify( {
                            userId: user?.uid,
                            blogId: _id
                        } )
                    } );
                    if ( response.ok ) {
                        toast.success( "Blog pinned." );
                        getPinnedBlogs();
                    }
                } catch ( error ) {
                    console.log( error );
                }
            }
        } else {
            toast.error( "Please login to pin blogs" );
        }
    };

    const getPinnedBlogs = async () => {
        if ( user ) {
            setLoading( true );
            try {
                const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/user/blogs/${ user.uid }`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                    }
                } );
                const data = await response.json();
                setLoading( false );
                if ( Array.isArray( data ) ) {
                    setPinnedBlogs( data );
                }
            } catch ( error ) {
                console.log( error );
            }
        }
    };

    useEffect( () => {
        getPinnedBlogs();
        scrollToTopOnRender();
        Aos.init();
    }, [] );

    useEffect( () => {
        getPinnedBlogs();
    }, [ user ] );

    return (
        <section>
            <h1 className="text-4xl font-bold pt-6 mb-12">Blog</h1>
            <div className="flex flex-col gap-16">
                {
                    blogs.map( ( { _id, question, answer } ) => {
                        return (
                            <div data-aos="slide-right" key={ _id } className="flex flex-col gap-4 mb-12">
                                <div className="inline-flex gap-2 justify-between">
                                    <h3 className="text-2xl lg:text-4xl font-bold">{ question }</h3>
                                    {
                                        pinnedBlogs.some( ( blog ) => blog === _id ) ?
                                            <Tooltip content="Unpin" className="hidden lg:block">
                                                <button onClick={ () => handlePinUnpin( _id ) }>
                                                    <BsPinFill className="box-content w-8 h-8 hover:text-gray-600 duration-150" />
                                                </button>
                                            </Tooltip>
                                            :
                                            <Tooltip content="Pin" className="hidden lg:block">
                                                <button onClick={ () => handlePinUnpin( _id ) }>
                                                    <BsPinAngle className="box-content w-8 h-8 hover:text-gray-600 duration-150" />
                                                </button>
                                            </Tooltip>
                                    }
                                </div>
                                <p className="">{ answer }</p>
                            </div>
                        );
                    } )
                }
            </div>
            <Toaster
                toastOptions={ {
                    success: {
                        duration: 700
                    },
                    error: {
                        duration: 1000
                    }
                } }
            />
        </section>
    );
};

export default Blog;