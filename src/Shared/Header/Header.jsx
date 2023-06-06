import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo-transparent.svg';
import { CgProfile } from 'react-icons/cg';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button, Avatar } from '@material-tailwind/react';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut, isToggled, setIsToggled, openLoginPopUp, setOpenLoginPopUp, setActiveLink } = useContext( UserContext );
    
    const handleLogOut = () => {
        Swal.fire( {
            title: 'Are you sure you want to logout?',
            text: "You will be restricted to homeplage only!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-error text-white rounded mr-2',
                cancelButton: 'btn btn-ghost rounded',
            },
        } ).then( ( result ) => {
            if ( result.isConfirmed ) {
                logOut();
                localStorage.removeItem( 'jwt-access-token' );
            };
        } );
    };

    return (
        <header className={ `fixed w-full top-0 z-[200] ${ isToggled && 'filter blur-sm transition-all duration-200' }` }>
            <nav className='w-full font-Josefin uppercase bg-base-100'>
                <div className="navbar justify-between md:justify-center md:gap-10 md:py-4 w-full max-w-screen-2xl mx-auto">
                    {/* Dropdown menu for mobile devices - on the left hand side */ }
                    <button className='btn btn-ghost lg:hidden' onClick={ () => setIsToggled( true ) }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>

                    {/*Left side nav links for >= md */ }
                    <div className="navbar-center hidden lg:flex">
                        <div className="menu menu-horizontal gap-10">
                            <Link className='hover:text-opacity-40 hover:text-accent duration-150' onClick={() => setActiveLink('Home')} to="/">Home</Link>
                            <Link className='hover:text-opacity-40 hover:text-accent duration-150' onClick={ () => setActiveLink('All Products')} to="/products/all">All Toys</Link>
                            <Link className='hover:text-opacity-40 hover:text-accent duration-150' onClick={() => setActiveLink('Blog')} to="/blog">Blog</Link>
                        </div>
                    </div>
                    {/* Sand| Logo |wich */ }
                    <Link className="mx-auto">
                        <img src={ logo } alt="logo" className='w-max h-8 lg:h-12' />
                    </Link>
                    {/*Right side nav links for >= md */ }
                    <div className="navbar-center hidden lg:flex">
                        <div className="menu menu-horizontal gap-10">
                            <Link className='hover:text-opacity-40 hover:text-accent duration-150' onClick={() => setActiveLink('Add a Toy')} to="/user/products/add_product">Add a Toy</Link>
                            <Link className='hover:text-opacity-40 hover:text-accent duration-150' onClick={ () => setActiveLink( 'My Toys' ) } to={ `/user/products/inventory` }>My Toys</Link>
                        </div>
                    </div>

                    {/* Profile Menu Popover */ }
                    <Popover className="relative">
                        { () => (
                            <>
                                {
                                    user ?
                                        <Popover.Button
                                            className="outline-none focus:outline-none rounded-full"
                                        >
                                            {
                                                user.photoURL ?
                                                    <Avatar src={ user?.photoURL } alt="avatar" withBorder={ true } className="p-0.5 w-9 h-9 border-primary" />
                                                    :
                                                    <CgProfile size={ 36 } />
                                            }
                                        </Popover.Button>
                                        :
                                        <button onClick={ () => setOpenLoginPopUp( !openLoginPopUp ) } className='uppercase hover:text-opacity-40 hover:text-accent duration-150'>Login</button>
                                }
                                <Transition
                                    as={ Fragment }
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute right-0 top-10 z-10 mt-3 w-64">
                                        <div className="overflow-hidden flex flex-col gap-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral p-4 text-base-100 font-sans">
                                            <h3 className='capitalize'>{ user?.displayName }</h3>
                                            <h3 className='lowercase'>{ user?.email }</h3>
                                            <Button size={ 'sm' } onClick={ handleLogOut } color="red" className='rounded'>Log out</Button>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        ) }
                    </Popover>
                </div>
            </nav>
        </header>
    );
};

export default Header;