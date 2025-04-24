import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../../Context/CartContext'
import Navbar from '../Navbar'
import CartItem from '../CartItem'
import EmptyCart from '../EmptyCart'
import './index.css'

/* eslint-disable camelcase */

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    getTotalPrice,
    restaurant_name,
  } = useContext(CartContext)

  const totalItems = cartList.length

  return (
    <div className="cart-app-container">
      <Navbar count={totalItems} restaurant_name={restaurant_name} />

      <div className="cart-content-container">
        {cartList.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="cart-header">
              <h1 className="cart-title">My Cart</h1>
              <button
                onClick={removeAllCartItems}
                className="remove-all-button"
                type="button"
                aria-label="Remove all items"
                data-testid="remove-all-button"
              >
                Remove All
              </button>
            </div>

            <CartItem />

            <div className="cart-summary">
              <div className="order-total">
                <span>Order Total:</span>
                <span className="total-price">
                  {cartList[0]?.dish_currency} {getTotalPrice()}
                </span>
              </div>
              <Link to="/" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
