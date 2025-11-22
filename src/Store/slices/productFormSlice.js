import { createSlice } from "@reduxjs/toolkit";

const productFormSlice = createSlice({
    name: 'productForm',
    initialState: {
        productName: '',
        price: '',
        description: '',
        brandName: '',
        stock: '',
        colors: [],
        category: '',
        images: [],
        products: [],
        cartItems: [],
        loading: false,
        error: null,
        wishlists: [],
        orderHistory: [],
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
        },
        setColors: (state, action) => {
            state.colors = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        resetForm: (state) => {
            state.productName = '';
            state.price = '';
            state.description = '';
            state.brandName = '';
            state.stock = '';
            state.colors = [];
            state.category = '';
            state.images = []
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        setImages: (state, action) => {
            state.images = action.payload
        },
        addImage: (state, action) => {
            state.images.push(action.payload)
        },
        removeImage: (state, action) => {
            state.images = state.images.filter((_, index) => index !== action.payload)
        },
        setMainImage: (state, action) => {
            const index = action.payload
            const imageToPromote = state.images[index]
            const otherImages = state.images.filter((_, i) => i !== index)
            state.images = [imageToPromote, ...otherImages]
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        addToCart: (state, action) => {
            const newItem = action.payload;

            const cartItemId = `${newItem._id}-${newItem.selectedColor ? newItem.selectedColor.name : 'no-color'}`;

            const existingItemIndex = state.cartItems.findIndex(item =>
                item.cartItemId === cartItemId
            );

            if (existingItemIndex >= 0) {

                state.cartItems[existingItemIndex].quantity += 1;
            } else {

                state.cartItems.push({
                    ...newItem,
                    cartItemId: cartItemId,
                    quantity: 1
                });
            }
        },
        removeFromCart: (state, action) => {
            const cartItemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== cartItemId);
        },
        increaseQuantity: (state, action) => {
            const cartItemId = action.payload;
            const item = state.cartItems.find(item => item.cartItemId === cartItemId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const cartItemId = action.payload;
            const item = state.cartItems.find(item => item.cartItemId === cartItemId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // Remove item if quantity becomes 0
                    state.cartItems = state.cartItems.filter(item => item.cartItemId !== cartItemId);
                }
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        setWishlists: (state, action) => {
            state.wishlists.push(action.payload)
        },
        setOrderHistory: (state, action) => {
            state.orderHistory.push(action.payload)
        }
    }
});

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))

            const response = await fetch('https://backend-of-nemo.vercel.app/products')
            const data = await response.json()
            dispatch(setProducts(data.data || data))
        } catch (error) {
            console.error('Error fetching products:', error)
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const {
    updateField,
    setColors,
    setCategory,
    resetForm,
    addProduct,
    addImage,
    setImages,
    removeImage,
    setMainImage,
    setProducts,
    setLoading,
    setError,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    setWishlists,
    setOrderHistory
} = productFormSlice.actions;

export default productFormSlice.reducer;