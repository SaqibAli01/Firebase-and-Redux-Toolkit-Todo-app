import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice';
// import counterSlice from './counterSlice';

const store = configureStore({
    reducer: {
     todoSlice: todoSlice
    }
});


export default store;
