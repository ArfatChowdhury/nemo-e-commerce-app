// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFirebaseAuth } from '../../config/firebaseConfig';

// // Async thunks
// export const signupUser = createAsyncThunk(
//     'auth/signup',
//     async ({ email, password, name }, { rejectWithValue }) => {
//         try {
//             const auth = await getFirebaseAuth();
//             const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');

//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             await updateProfile(userCredential.user, { displayName: name });
//             return {
//                 uid: userCredential.user.uid,
//                 email: userCredential.user.email,
//                 displayName: name
//             };
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const loginUser = createAsyncThunk(
//     'auth/login',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const auth = await getFirebaseAuth();
//             const { signInWithEmailAndPassword } = await import('firebase/auth');

//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             return {
//                 uid: userCredential.user.uid,
//                 email: userCredential.user.email,
//                 displayName: userCredential.user.displayName
//             };
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const logoutUser = createAsyncThunk(
//     'auth/logout',
//     async (_, { rejectWithValue }) => {
//         try {
//             const auth = await getFirebaseAuth();
//             const { signOut } = await import('firebase/auth');

//             await signOut(auth);
//             return null;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null,
//         loading: false,
//         error: null
//     },
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         }
//     },
//     extraReducers: (builder) => {
//         // Signup
//         builder.addCase(signupUser.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(signupUser.fulfilled, (state, action) => {
//             state.loading = false;
//             state.user = action.payload;
//         });
//         builder.addCase(signupUser.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Login
//         builder.addCase(loginUser.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(loginUser.fulfilled, (state, action) => {
//             state.loading = false;
//             state.user = action.payload;
//         });
//         builder.addCase(loginUser.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Logout
//         builder.addCase(logoutUser.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(logoutUser.fulfilled, (state) => {
//             state.loading = false;
//             state.user = null;
//         });
//         builder.addCase(logoutUser.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//     }
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;
