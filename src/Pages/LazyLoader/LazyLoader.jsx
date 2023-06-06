const LazyLoader = () => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 lg:mt-6'>
            <div className="h-60 lg:h-[20rem] bg-white rounded shadow-2xl">
                <div className="h-32 m-2 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
                <div className="p-2">
                    <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="h-60 lg:h-[20rem] bg-white rounded shadow-2xl">
                <div className="h-32 m-2 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
                <div className="p-2">
                    <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="h-60 lg:h-[20rem] bg-white rounded shadow-2xl hidden lg:block">
                <div className="h-32 m-2 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
                <div className="p-2">
                    <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="h-60 lg:h-[20rem] bg-white rounded shadow-2xl hidden lg:block">
                <div className="h-32 m-2 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
                <div className="p-2">
                    <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="h-60 lg:h-[20rem] bg-white rounded shadow-2xl hidden lg:block">
                <div className="h-32 m-2 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
                <div className="p-2">
                    <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LazyLoader;