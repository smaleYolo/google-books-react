import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


//&key=AIzaSyCWDKaWPjXaPLZ0D_uo9NV8FKfXN2n1xDY
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async function ({searchTerm = 'js',sortBy,category}, {rejectWithValue}) {
        try {
            let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? `${'+intitle:'+searchTerm}` : 'node'}${category !=='all' ? `+subject:${category}` : ''}&orderBy=${sortBy ? sortBy : 'relevance'}&maxResults=10`

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json()

            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMoreBooks = createAsyncThunk(
    'books/fetchMoreBooks',
    async ({ startIndex, maxResults,category,searchTerm = 'js' }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? `${'+intitle:'+searchTerm}` : 'node'}${category !=='all' ? `+subject:${category}` : ''}&startIndex=${startIndex}&maxResults=${maxResults}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async function(id, {rejectWithValue}){
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)

            if (!response.ok) {
                return rejectWithValue('Server Error!')
            }

            const data = await response.json()

            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const initialState = {
    books: {
        items: [],
        totalItems: 0,
    },
    bookById: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.bookById = action.payload;
                state.loading = false;
            })
            .addCase(fetchMoreBooks.fulfilled, (state, action) => {
                state.books = {
                    ...state.books,
                    items: [...state.books.items, ...action.payload],
                };
            })
            .addCase(fetchMoreBooks.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
})

// export const {} = bookSlice.actions

export default bookSlice.reducer