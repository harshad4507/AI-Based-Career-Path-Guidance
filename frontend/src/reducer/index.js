import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import assessmentReducer from "../slices/assessmentSlice"
import domainReducer from "../slices/domainSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  assessment: assessmentReducer,
  domain: domainReducer 
})

export default rootReducer
