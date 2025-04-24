import {useContext} from 'react'
import {CartContext} from '../../Context/CartContext'

/* eslint-disable camelcase */

const CartItem = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  return (
    <ul className="cart-items-list">
      {cartList.map(item => (
        <li key={item.dish_id} className="cart-item">
          <div className="cart-item-left">
            <img
              src={item.dish_image}
              alt={item.dish_name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.dish_name}</h3>
              <p>
                {item.dish_currency} {item.dish_price}
              </p>
            </div>
          </div>
          <div className="cart-item-right">
            <div className="cart-item-quantity">
              <button
                onClick={() => decrementCartItemQuantity(item.dish_id)}
                type="button"
                data-testid="decrement-button"
                aria-label="Increase quantity"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => incrementCartItemQuantity(item.dish_id)}
                type="button"
                data-testid="increment-button"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeCartItem(item.dish_id)}
              className="remove-item-btn"
              type="button"
              data-testid="remove"
              aria-label="remove quantity"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default CartItem
