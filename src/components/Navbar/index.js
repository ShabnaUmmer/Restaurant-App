import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link, useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'

import {CartContext} from '../../Context/CartContext'

import './index.css'

/* eslint-disable camelcase */

const Navbar = () => {
  const {cartList, restaurant_name} = useContext(CartContext)

  const history = useHistory()

  const cartCount = cartList.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.push('/login')
  }

  return (
    <div className="navbar">
      <Link to="/" className="restaurant-link">
        <h1>{restaurant_name}</h1>
      </Link>
      <div className="navbar-right">
        <button
          onClick={handleLogout}
          className="logout-button"
          type="button"
          aria-label="Logout"
        >
          Logout
        </button>
        <div className="cart-container">
          <h4>My Orders</h4>
          <Link to="/cart" className="cart-link">
            <div className="cart-counts">
              <span className="cart-count">{cartCount}</span>
              <button type="button" className="cart-button" data-testid="cart">
                <AiOutlineShoppingCart className="cart-icon" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
