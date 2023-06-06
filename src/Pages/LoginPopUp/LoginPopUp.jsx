import { useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import LoginArea from './LoginArea';
import SignUpArea from './SignUpArea';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { RxCross2 } from 'react-icons/rx';

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const LoginPopUp = () => {

    const { openLoginPopUp, setOpenLoginPopUp } = useContext( UserContext );
    const [ type, setType ] = useState( "signin" );

    const navigate = useNavigate();

    const handleClose = () => {
        navigate( '/' );
        setOpenLoginPopUp( false );
    };

    return (
        <Transition appear show={ openLoginPopUp } as={ Fragment }>
            <Dialog as="div" className="relative z-50" onClose={ () => setOpenLoginPopUp( false ) }>
                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-[21rem] lg:w-full max-w-md transform rounded bg-white p-4 text-left align-middle shadow-xl transition-all">
                                <Tabs className="overflow-visible" value={ 'signin' } onChange={ setType }>
                                    <TabsHeader className="relative z-0 ">
                                        <Tab value="signin" onClick={ () => setType( "signin" ) }>
                                            Sign in
                                        </Tab>
                                        <Tab value="signup" onClick={ () => setType( "signup" ) }>
                                            Sign up
                                        </Tab>
                                    </TabsHeader>
                                    <TabsBody
                                        className="!overflow-x-hidden !overflow-y-visible"
                                        animate={ {
                                            initial: {
                                                x: type === "signin" ? 400 : -400,
                                            },
                                            mount: {
                                                x: 0,
                                            },
                                            unmount: {
                                                x: type === "signin" ? 400 : -400,
                                            },
                                        } } >
                                        <TabPanel value="signin" className="p-0">
                                            <LoginArea />
                                        </TabPanel>
                                        <TabPanel value="signup" className="p-0">
                                            <SignUpArea />
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                                <RxCross2
                                    type='button'
                                    size={ 20 }
                                    className="absolute -top-4 -right-4 text-base-200 z-[100] rounded-full bg-white p-2 box-content drop-shadow-lg hover:text-error"
                                    onClick={ handleClose }
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default LoginPopUp;