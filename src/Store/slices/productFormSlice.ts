import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type definitions
interface ColorOption {
    name: string;
    value: string;
}

interface Product {
    _id: string;
    productName: string;
    price: number;
    description: string;
    brandName: string;
    stock: number;
    colors: ColorOption[];
    category: string;
    images: string[];
}

export interface CartItem {
    _id: string;
    cartItemId: string;
    productName: string;
    price: number;
    quantity: number;
    images?: string[];
    selectedColor?: ColorOption;
    description?: string;
    brandName?: string;
    stock?: number;
    category?: string;
}

interface ProductFormState {
    productName: string;
    price: string;
    description: string;
    brandName: string;
    stock: string;
    colors: ColorOption[];
    category: string;
    images: string[];
    products: Product[];
    cartItems: CartItem[];
    loading: boolean;
    error: string | null;
    wishlists: any[];
    orderHistory: any[];
}

const initialState: ProductFormState = {
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
};

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof ProductFormState; value: any }>) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },
        setColors: (state, action: PayloadAction<ColorOption[]>) => {
            state.colors = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        resetForm: (state) => {
            state.productName = '';
            state.price = '';
            state.description = '';
            state.brandName = '';
            state.stock = '';
            state.colors = [];
            state.category = '';
            state.images = [];
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        setImages: (state, action: PayloadAction<string[]>) => {
            state.images = action.payload;
        },
        addImage: (state, action: PayloadAction<string>) => {
            state.images.push(action.payload);
        },
        removeImage: (state, action: PayloadAction<number>) => {
            state.images = state.images.filter((_, index) => index !== action.payload);
        },
        setMainImage: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const imageToPromote = state.images[index];
            const otherImages = state.images.filter((_, i) => i !== index);
            state.images = [imageToPromote, ...otherImages];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addToCart: (state, action: PayloadAction<Partial<CartItem> & { _id: string; productName: string; price: number }>) => {
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
                } as CartItem);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const cartItemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== cartItemId);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const cartItemId = action.payload;
            const item = state.cartItems.find(item => item.cartItemId === cartItemId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
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
        setWishlists: (state, action: PayloadAction<any>) => {
            state.wishlists.push(action.payload);
        },
        setOrderHistory: (state, action: PayloadAction<any>) => {
            state.orderHistory.push(action.payload);
        }
    }
});

export const fetchProducts = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const response = await fetch('https://backend-of-nemo.vercel.app/products');
            const data = await response.json();
            dispatch(setProducts(data.data || data));
        } catch (error: any) {
            console.error('Error fetching products:', error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

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
