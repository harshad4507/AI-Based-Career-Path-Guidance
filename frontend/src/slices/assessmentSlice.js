import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    assessment1: {},
    assessment2: {},
    assessment3: {},
  },
  loading: false,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState: initialState,
  reducers: {
    setAssessmentData(state, action) {
      const { step, data } = action.payload; // Destructure payload
      state.formData[step] = data; // Correct property update
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setAssessmentData, setLoading } = assessmentSlice.actions;

export default assessmentSlice.reducer;
