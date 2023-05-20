import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo-icon.svg';
import { CgProfile } from 'react-icons/cg';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
const Header = () => {

    const { user } = useContext( UserContext );
    const [ isToggled, setIsToggled ] = useState( false );

    useEffect( () => {
        window.addEventListener( 'scroll', () => {
            const scrollY = window.scrollY;
            if ( scrollY > 20 ) {
                document.querySelector( 'header' ).classList.add( 'drop-shadow-lg' );
            }
            else {
                document.querySelector( 'header' ).classList.remove( 'drop-shadow-lg' );
            }
        } );

    }, [] );

    useEffect( () => {
        const body = document.querySelector( 'body' );
        if ( isToggled ) {
            body.classList.add( 'overflow-hidden' );
        }
        else {
            body.classList.remove( 'overflow-hidden' );
        }
    }, [ isToggled ] );



    return (
        <header className='sticky top-0 z-50'>
            <nav className="navbar justify-between md:justify-center md:gap-10 bg-base-100 md:py-4">
                {/* Logo  */ }
                <Link className="hidden md:block">
                    <img src={ logo } alt="logo" className='w-12 h-12' />
                </Link>

                {/* Dropdown menu for mobile devices */ }
                <button className='btn lg:hidden' onClick={ () => setIsToggled( !isToggled ) }>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </button>

                {/* Drawer for mobile devices */ }
                <Transition
                    show={ isToggled }
                    enter="transition-opacity duration-400"
                    enterFrom="opacity-0"
                    enterTo="opacity-40"
                    leave="transition-opacity duration-400"
                    leaveFrom="opacity-40"
                    leaveTo="opacity-0"
                    className="bg-black fixed top-0 left-0 h-screen w-screen "
                    onClick={ () => setIsToggled( false ) }
                />
                <Transition
                    show={ isToggled }
                    enter="transition-transform duration-300"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                    className={ `flex flex-col items-start md:hidden fixed top-0 left-0 h-screen w-7/12 bg-white ${ isToggled && 'overflow-y-auto pointer-events-auto' }` }
                >
                    <button className="btn lg:hidden sticky top-2 left-2" onClick={ () => setIsToggled( !isToggled ) }>
                        <RxCross2 size={ 24 } />
                    </button>
                    <div className='mt-8 pl-8 flex flex-col gap-3'>
                        <Link to="/">Home</Link>
                        <Link to="/all_toys">All Toys</Link>
                        <Link to="/seller_center">Become a Seller</Link>
                        <Link to="/blog">Blog</Link>
                    </div>
                </Transition>

                {/* Nav Links for >= md */ }
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal px-1 gap-8">
                        <Link to="/">Home</Link>
                        <Link to="/all_toys">All Toys</Link>
                        <Link to="/seller_center">Become a Seller</Link>
                        <Link to="/blog">Blog</Link>
                    </div>
                </div>

                {/* Seach bar */ }
                <div className='inline-flex gap-2'>
                    <input
                        name='search'
                        type="text"
                        placeholder="Search"
                        className="input input-bordered md:w-[30rem] h-10 md:h-12"
                    />
                    <button className="btn btn-ghost btn-circle hidden md:inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>

                {/* User dropdown menu */ }
                <div className="flex-none gap-2 px-2">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={ 0 } className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <CgProfile size={ 40 } />
                                    </div>
                                </label>
                                <ul tabIndex={ 0 } className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to={ `/user/profile/${ user?._id }` } className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                            :
                            <Link to='/login'>Login</Link>
                    }
                </div>

            </nav>
        </header>
    );
};

export default Header;