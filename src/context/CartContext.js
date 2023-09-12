import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  totalPrice: 0,
  getTotalPrice: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  clearAllItemsFromCartList: () => {},
})

export default CartContext
