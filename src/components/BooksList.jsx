import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import BookCard from './BookCard';
import {CircularProgress} from "@mui/material";

const BooksList = ({handleLoadMore}) => {
    const {totalItems, items} = useSelector((state) => state.bookSlice.books);
    const books = useSelector((state) => state.bookSlice);
    const {loading} = useSelector((state) => state.bookSlice);


    if (loading) {
        return (
            <div className='flex justify-center items-center my-20'>
                <CircularProgress/>
            </div>
        )
    }

    if (!items) {
        return (
            <div className="mt-4 flex justify-center">
                <div>No books found</div>
            </div>
        );
    }

    return (
        <>
            <div className="mt-4 flex justify-center flex-col">
                {totalItems ? <span className="text-center">Found {totalItems} books.</span> : null}

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
                    {items &&
                        items.map((item, i) => (
                            <BookCard
                                key={i}
                                bookId={item.id}
                                title={item.volumeInfo.title}
                                category={item.volumeInfo.categories}
                                authors={item.volumeInfo.authors}
                                images={item.volumeInfo?.imageLinks}
                            />
                        ))}
                </div>
            </div>
            <div
                className='flex justify-center mt-8 mb-8'
                onClick={handleLoadMore}
            >
                <h2 className='bg-blue-400 text-white rounded-md px-3 py-2 cursor-pointer hover:opacity-60'>
                    Load more...
                </h2>
            </div>
        </>
    );
};

export default BooksList;
