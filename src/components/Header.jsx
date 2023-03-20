import React from 'react';
import {AiOutlineSearch} from "react-icons/ai";

const Header = ({handleSubmit,searchTerm,setSearchTerm,category,setCategory,sortBy,setSortBy}) => {
    return (
        <header
            className="h-300 w-screen bg-cover bg-center bg-bgImg shadow-lg pt-10"
        >
            <div className="w-full h-full flex flex-col items-center">
                <h1 className="text-white text-4xl font-bold mb-4">Search for books</h1>
                <form onSubmit={handleSubmit}>

                    {/*//headerInput*/}
                    <div className="flex items-center mb-4 justify-center">
                        <div className='px-2 py-1 w-80 border border-gray-300 rounded-md flex justify-between bg-white'>
                            <input
                                type="text"
                                className="w-full focus:outline-none "
                                placeholder="Search for books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-black hover:opacity-40 transition"
                            >
                                <AiOutlineSearch className='text-2xl'/>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col items-end md:justify-between md:flex-row gap-4 text-center mb-4'>

                        {/*HeaderCategories*/}
                        <div className="flex items-center">
                            <label htmlFor="category-select" className="mr-4 text-white">
                                Categories:
                            </label>
                            <select
                                id="category-select"
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="art">Art</option>
                                <option value="biography">Biography</option>
                                <option value="computers">Computers</option>
                                <option value="history">History</option>
                                <option value="medical">Medical</option>
                                <option value="poetry">Poetry</option>
                            </select>
                        </div>


                        {/*Header sort*/}
                        <div className="flex items-center">
                            <label htmlFor="sort-by-select" className="mr-4 text-white">
                                Sort by:
                            </label>
                            <select
                                id="sort-by-select"
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </header>
    );
};

export default Header;