import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice"
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
/**The store is a “container” (really a JavaScript object) 
that holds the application state, and the only way the state can change is through actions dispatched to the store. Redux allows individual components connect to the store and apply changes to it by dispatching actions. */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});
