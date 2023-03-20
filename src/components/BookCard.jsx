import React from 'react';
import noImage from '../assets/nf.png'
import {Link} from "react-router-dom";

const BookCard = ({bookId,title,images,category,authors}) => {

    return (
        <div className=' w-full h-full bg-gray-100 flex flex-col rounded-md'>
            <div className='flex px-4 py-8 justify-center'>
                {images ? (
                    <Link to={`/books/${bookId}`}><img
                        src={images.thumbnail}
                        width={150}
                        height={300}
                        alt="logo"
                        className='shadow-lg hover:scale-110 transition rounded-md cursor-pointer'
                    /></Link>
                ) : (
                    <Link to={`/books/${bookId}`}><img
                        src={noImage}
                        width={150}
                        height={300}
                        alt="logo"
                        className='shadow-lg hover:scale-110 transition rounded-md cursor-pointer'
                    /></Link>
                )}
            </div>
            <div className='flex justify-start flex-col px-3 pb-3'>
                <span className='text-gray-400 underline pb-3'>{category}</span>
                <h2 className='font-bold'>{title}</h2>
                <p className='font-light text-gray-400'>{authors}</p>
            </div>
        </div>
    );
};

export default BookCard;

