import { configureStore } from '@reduxjs/toolkit';
import TableReducer from './TableReducer';

let store = configureStore({
    reducer: {
        TablePage: TableReducer,
    }
});

window.store = store;

export default store;