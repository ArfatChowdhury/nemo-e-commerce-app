const { createSlice } = require("@reduxjs/toolkit");



const productFormSlice = createSlice({
    name: 'productForm',
    initialState:{
        productName: '',
        price: '',
        description: '',
        brandName: '',
        stock: '',
        colors: [],
        category: ''
    },
    reducers:{
        updateField: (state, action) =>{
            const {field, value} = action.payload
            state[field] = value
        },
        setColors: (state, action)=>{
            state.colors = action.payload
        },
        setCategory: (state, action) =>{
            state.category = action.payload
        },
        resetForm: (state) =>{
            return{
                productName: '',
                price: '',
                description: '',
                brandName: '',
                stock: '',
                colors: [],
                category: ''
            }
        }
    }
})