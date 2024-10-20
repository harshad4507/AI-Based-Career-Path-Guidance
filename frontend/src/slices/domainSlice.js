import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domainData: null,
    loading: false,
};

const domainSlice = createSlice({
    name: "domain",
    initialState: initialState,
    reducers: {
        setdomainData(state, value) {
            state.domainData = value.payload;
        },
        setLoadingATDomain(state, value) {
            state.loading = value.payload;
        },
    },
});

export const { setdomainData , setLoadingATDomain} = domainSlice.actions;

export default domainSlice.reducer;
