import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    totalPrice: 0,
  }

  //Added selected product to the cart

  addCartItem = product => {
    const {id, quantity, price} = product
    const {cartList} = this.state
    const finalPrice = quantity * price

    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + finalPrice,
    }))

    const isPresent = cartList.some(item => item.id === id)

    if (isPresent === false) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newList = cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + quantity}
        }
        return item
      })
      this.setState({cartList: newList})
    }
  }

  //In cartItem increase the item quantity

  incrementCartItemQuantity = object => {
    const {id, quantity, price} = object
    const {cartList} = this.state

    this.setState(prevState => ({totalPrice: prevState.totalPrice + price}))

    const UpdatedQuantity = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: quantity + 1}
      }
      return item
    })

    this.setState({cartList: UpdatedQuantity})
  }

  //In cartItem decrease the item quantity

  decrementCartItemQuantity = productDetails => {
    const {id, quantity, price} = productDetails
    const {cartList, totalPrice} = this.state

    if (quantity > 0 && totalPrice > 0) {
      this.setState(prevState => ({totalPrice: prevState.totalPrice - price}))
    }

    const UpdatedQuantity = cartList.map(item => {
      if (item.id === id) {
        if (item.quantity > 0) {
          return {...item, quantity: quantity - 1}
        }
        return {...item, quantity: 0}
      }
      return item
    })

    this.setState({cartList: UpdatedQuantity})
  }

  removeAllCartItems = () => {
    const {cartList} = this.state

    this.setState({cartList: [], totalPrice: 0})
  }

  //In cartItem remove the item when remove icon is clicked

  removeCartItem = id => {
    const {cartList} = this.state

    const filteredList = cartList.filter(eachItem => eachItem.id !== id)

    this.setState({cartList: filteredList})
  }

  render() {
    const {cartList, totalPrice} = this.state
    console.log(totalPrice)

    return (
      <CartContext.Provider
        value={{
          cartList,
          totalPrice,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          getTotalPrice: this.getTotalPrice,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
