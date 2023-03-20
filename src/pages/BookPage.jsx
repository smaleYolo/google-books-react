import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../redux/slices/bookSlice';
import {Link, useParams} from 'react-router-dom';

import noImage from '../assets/nf.png';
import {CircularProgress} from "@mui/material";

const BookPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchBookById(id));
    }, []);

    const { volumeInfo } = useSelector((state) => state.bookSlice.bookById);
    const { loading } = useSelector((state) => state.bookSlice);

    if(loading){
        return (
            <div className='flex justify-center items-center my-20'>
                <CircularProgress />
            </div>
        )
    }


    //Находим изображения, сохраняем их в массив,
    //если нет изображений, подставляем загулшку
    let images = [`${noImage}`]
    if(volumeInfo?.imageLinks){
        for (const image in volumeInfo.imageLinks) {
            images.push(volumeInfo.imageLinks[image])
        }
        images.shift()
    }


    return (
        <div className='flex justify-between h-full'>
            <div className='w-3/4 bg-gray-100 py-8'>
                <Link to='/books'>
                    <button
                        className='bg-yellow-300 w-14 h-8 rounded-lg mx-4 shadow-lg hover:scale-110 transition'
                    >
                        Назад
                    </button>
                </Link>
                <img
                    src={images[0]}
                    alt='noImg'
                    className='justify-center w-3/4 my-auto mx-auto shadow-2xl'
                />
            </div>

            <div className='flex flex-col w-full px-8 mt-8'>
                {volumeInfo && (
                    <>
                        <p className='font-light'>{volumeInfo.categories}</p>
                        <h2 className='mt-7 font-semibold text-xl'>{volumeInfo.title}</h2>
                        <p className='mt-4 font-light underline opacity-60'>{volumeInfo.authors}</p>
                        <div className='mt-6 border-2 w-full h-300 px-3 py-4'>{volumeInfo.description}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookPage;



