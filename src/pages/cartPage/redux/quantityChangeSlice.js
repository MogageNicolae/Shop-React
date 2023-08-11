import {createSlice} from "@reduxjs/toolkit";

const initialState = {value: {}};

export const quantityChangeSlice = createSlice({
    name: 'quantityChange',
    initialState,
    reducers: {
        increase: (state, action) => {
            state.value[action.payload.id] += 1;
        },
        decrease: (state, action) => {
            state.value[action.payload.id] -= 1;
        },
        setNewValue: (state, action) => {
            state.value[action.payload.id] = action.payload.value;
        },
    },
});

export const {increase, decrease, setNewValue} = quantityChangeSlice.actions;

export default quantityChangeSlice.reducer;