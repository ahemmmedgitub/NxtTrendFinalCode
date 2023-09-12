import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, totalPrice} = value
      const itemsInCart = cartList.length
      const showEmptyView = cartList.length === 0

      const clearAllItems = () => {
        removeAllCartItems()
      }

      const toDisplayRemoveAllBtn = () => (
        <div className="remove-container">
          <button onClick={clearAllItems} className="remove-btn" type="button">
            Remove All
          </button>
        </div>
      )

      const toDisplayTotalPrice = () => (
        <div className="total-price-container">
          <div className="price-container">
            <h1 className="price-heading">
              Order Total: <span className="span-price">Rs {totalPrice}/-</span>
            </h1>
            <p className="number-of-items">{itemsInCart} items in cart</p>
            <button className="check-out-btn" type="button">
              Checkout
            </button>
          </div>
        </div>
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {showEmptyView ? null : toDisplayRemoveAllBtn()}
                <CartListView />
                {showEmptyView ? null : toDisplayTotalPrice()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
