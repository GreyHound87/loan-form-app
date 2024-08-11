import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormStateType } from '../../types/FormStateType';

const initialState: FormStateType = {
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workplace: '',
    address: '',
    loanAmount: null,
    loanTerm: null,
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormField: (state, action: PayloadAction<Partial<FormStateType>>) => ({ ...state, ...action.payload }),
    },
});

export const { updateFormField } = formSlice.actions;

export const formApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'products/add',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: product,
            }),
        }),
    }),
});

export const { useAddProductMutation } = formApi;
