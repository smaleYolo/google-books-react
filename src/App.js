import BooksList from "./components/BooksList";
import {Routes, Route} from "react-router-dom";
import BookPage from "./pages/BookPage";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchBooks, fetchMoreBooks} from "./redux/slices/bookSlice";
import Header from "./components/Header";


function App() {
    const [startIndex, setStartIndex] = useState(0);
    const [maxResults, setMaxResults] = useState(10);

    const [searchTerm, setSearchTerm] = useState("js");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("relevance");

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchBooks({searchTerm, sortBy, category}))
    };

    useEffect(() => {
        dispatch(fetchMoreBooks({ startIndex, maxResults, category, searchTerm }));
    }, []);

    const handleLoadMore = () => {
        setStartIndex(startIndex + maxResults);
        dispatch(fetchMoreBooks({ startIndex: startIndex + maxResults, maxResults,category,searchTerm }));
    };

    return (
        <>
            <Header
                sortBy={sortBy}
                setSortBy={setSortBy}
                setCategory={setCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSubmit={handleSubmit}
                category={category}
            />
            <Routes>
                <Route path='/' element={<BooksList handleLoadMore={handleLoadMore}/>}/>
                <Route path='/:id' element={<BookPage/>}/>
                <Route path='*' element={<BooksList handleLoadMore={handleLoadMore}/>}/>
            </Routes>
        </>
    );
}

export default App;
