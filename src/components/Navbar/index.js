import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link, useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'

import {CartContext} from '../../Context/CartContext'

import './index.css'

/* eslint-disable camelcase */

const Navbar = ({restaurant_name}) => {
  const {cartList} = useContext(CartContext)
  const history = useHistory()

  const totalItems = cartList.length

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
          <Link to="/cart" className="cart-link" data-testid="cart">
            <div className="cart-counts">
              <span className="cart-count">{totalItems}</span>
              <AiOutlineShoppingCart className="cart-icon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
