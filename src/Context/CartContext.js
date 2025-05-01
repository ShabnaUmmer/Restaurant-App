import {createContext, useState} from 'react'

export const CartContext = createContext()

/* eslint-disable camelcase */
export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])
  const [restaurant_name, setRestaurantName] = useState('')

  const addCartItem = dish => {
    setCartList(prev => {
      const existingItem = prev.find(item => item.dish_id === dish.dish_id)
      if (existingItem) {
        return prev.map(item =>
          item.dish_id === dish.dish_id
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        )
      }
      return [...prev, {...dish}]
    })

    if (dish.restaurant_name) {
      setRestaurantName(dish.restaurant_name)
    }
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prev =>
      prev.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prev =>
      prev
        .map(item =>
          item.dish_id === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeCartItem = dishId => {
    setCartList(prev => prev.filter(item => item.dish_id !== dishId))
  }

  const removeAllCartItems = () => {
    setCartList([])
    setRestaurantName('')
  }

  const getTotalPrice = () =>
    cartList
      .reduce((total, item) => total + item.dish_price * item.quantity, 0)
      .toFixed(2)

  return (
    <CartContext.Provider
      value={{
        cartList,
        restaurant_name,
        setRestaurantName,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
