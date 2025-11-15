import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const CartScreen = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = `${API_BASE_URL}/products`
      console.log('🌐 Fetching products from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📦 API Response:', data)
      
      // Handle the API response structure: { success: true, data: [...], count: ... }
      if (data.success && data.data) {
        setProducts(data.data)
      } else if (Array.isArray(data)) {
        // Fallback: if response is directly an array
        setProducts(data)
      } else {
        setProducts([])
      }
      
    } catch (err) {
      console.error('❌ Error fetching products:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
      console.error('❌ Error message:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}

export default CartScreen

