import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import patientService from './patientService';

const initialState = {
    patients: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Intake new patient
export const intakePatient = createAsyncThunk('patients/intake', async(patientData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.intakePatient(patientData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get patients
export const getPatients = createAsyncThunk('patients/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.getPatients(token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get patient
export const getPatient = createAsyncThunk('patients/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.getPatient(token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// // Update patient
// export const updatePatient = createAsyncThunk('patients/update', async(patientData, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await patientService.updatePatient(patientData, token);
//     } catch (error) {
//         const message = (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//             error.message ||
//             error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// Delete patient
export const deletePatient = createAsyncThunk('patients/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.deletePatient(id, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(intakePatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(intakePatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients.push(action.payload)
            })
            .addCase(intakePatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = action.payload
            })
            .addCase(getPatients.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = action.payload
            })
            .addCase(getPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = state.patients.filter((patient) => patient._id !== action.payload.id)
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;