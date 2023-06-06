import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


const Pagination = ( { page, setPage, pagesCount } ) => {

    const pageButtons = Array.from( { length: pagesCount }, ( _, index ) => index + 1 );

    const next = () => {
        if ( page === pageButtons.length ) return;
        setPage( page + 1 );
    };

    const prev = () => {
        if ( page === 1 ) return;
        setPage( page - 1 );
    };

    return (
        <div className="flex items-center justify-end gap-4 w-full my-8">
            <IconButton
                size="sm"
                variant="outlined"
                color="gray"
                onClick={ prev }
                disabled={ page === 1 }
                className="focus:outline-none focus:shadow-none focus:ring-0"
            >
                <ArrowLeftIcon strokeWidth={ 2 } className="h-4 w-4" />
            </IconButton>
            <Typography className=" inline-flex items-center gap-2">
                Page <strong className="text-primary font-extrabold">{ page }</strong> of
                <strong className="text-primary font-extrabold">{ pagesCount }</strong>
            </Typography>
            <IconButton
                size="sm"
                variant="outlined"
                color="gray"
                onClick={ next }
                disabled={ page === pagesCount }
                className="focus:outline-none focus:shadow-none focus:ring-0"
            >
                <ArrowRightIcon strokeWidth={ 2 } className="h-4 w-4" />
            </IconButton>
        </div>
    );
};

export default Pagination;