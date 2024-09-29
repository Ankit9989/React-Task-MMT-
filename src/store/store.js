import { configureStore, createSlice } from '@reduxjs/toolkit';
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('formData', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('formData');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const initialState = loadFromLocalStorage() || {
  personalInfo: {},
  companyInfo: {},
  planSelection: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
      saveToLocalStorage(state);  
    },
    saveCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
      saveToLocalStorage(state);  
    },
    savePlanSelection: (state, action) => {
      state.planSelection = action.payload;
      saveToLocalStorage(state);  
    },
  }
});

export const { savePersonalInfo, saveCompanyInfo, savePlanSelection } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export default store;
