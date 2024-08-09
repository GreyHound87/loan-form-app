import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateType } from '../../types/FormStateType';

const initialState: FormStateType = {
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workplace: '',
    address: '',
    loanAmount: 0,
    loanTerm: 0,
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormField: (state, action: PayloadAction<Partial<FormStateType>>) => ({ ...state, ...action.payload }),
    },
});

export const { updateFormField } = formSlice.actions;
