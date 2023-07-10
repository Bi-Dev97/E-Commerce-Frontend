import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; /**🎉 React-Toastify 
allows you to add notifications to your app with ease. */
import { contactService } from "./contactService";

export const createQuery = createAsyncThunk(
  "contact/post",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const contactState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
/**createSlice A function that accepts an initial state, 
an object of reducer functions, and a "slice name", 
and automatically generates action 
creators and action types that correspond to the reducers and state. */
export const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contact = action.payload;
        if(state.isSuccess === true){
          toast.success("Contact Form Submitted Succcessfully")
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
          toast.error("Something Went Wrong")
        }
      });
  },
});

export default contactSlice.reducer;
