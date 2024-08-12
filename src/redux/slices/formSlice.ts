import { createSlice, PayloadAction } from '@reduxjs/toolkit'; //  для упрощения работы с Redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormStateType } from '../../types/FormStateType';
import { CategoryType } from '../../types/CategoryType';

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
        updateFormField: (state, action: PayloadAction<Partial<FormStateType>>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { updateFormField } = formSlice.actions;

const BASE_URL = 'https://dummyjson.com/';

export const formApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        addProduct: builder.mutation<void, { title: string }>({
            query: (product) => ({
                url: 'products/add',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: product,
            }),
        }),
        //  RTK Query автоматически кэширует результаты запросов
        getCategories: builder.query<CategoryType[], void>({
            query: () => 'products/categories',
            // Настройка keepUnusedDataFor / refetchOnMountOrArgChange
        }),
    }),
});

export const { useAddProductMutation, useGetCategoriesQuery } = formApi;
