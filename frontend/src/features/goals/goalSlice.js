import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

// creategoal
export const createGoal = createAsyncThunk('goal/create' , async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
             error.response.data.message) || 
             error.message || 
             error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get goals
export const getGoals = createAsyncThunk('goal/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
        
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
             error.response.data.message) || 
             error.message || 
             error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Delete Goals
export const deleteGoals = createAsyncThunk('goal/delete', async (id, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoals(id, token)
        
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
             error.response.data.message) || 
             error.message || 
             error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update goal

export const updateGoal = createAsyncThunk('goal/update', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.updateGoal(userData, token)
        
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
             error.response.data.message) || 
             error.message || 
             error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const goalSlice = createSlice({
    name : 'goal',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
        })
        .addCase(deleteGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.map((goal) => {
                if (goal._id === action.payload.id){
                    goal.text = action.payload.text
                }
            })
            
        })
        .addCase(updateGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer