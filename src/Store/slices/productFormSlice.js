const { createSlice } = require("@reduxjs/toolkit");



const productFormSlice = createSlice({
    name: 'productForm',
    initialState:{
        productName: '',
        price: '',
        description: '',
        brandName: '',
        stock: '',
        color: [],
        category: ''
    },
    reducers:{
        updateField: (state, action) =>{
            const {field, value} = action.payload
            state[field] = value
        }
    }
})