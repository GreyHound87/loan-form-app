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
        updateFormField: (state, action: PayloadAction<{ field: keyof FormStateType; value: string | number }>) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },
    },
});

export const { updateFormField } = formSlice.actions;
