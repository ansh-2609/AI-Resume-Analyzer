
import {createSlice} from '@reduxjs/toolkit';  

const interviewQuestionsSlice = createSlice({
    name: 'interviewQuestions',
    initialState: {
        questions: [],
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
    }
})

export const { setQuestions} = interviewQuestionsSlice.actions;
export default interviewQuestionsSlice;