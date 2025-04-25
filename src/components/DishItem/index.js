import {useContext, useState} from 'react'
import {CartContext} from '../../Context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const {cartList, addCartItem} = useContext(CartContext)

  const [localQuantity, setLocalQuantity] = useState(0)
  const cartItem = cartList.find(item => item.dish_id === dish.dish_id)
  const cartQuantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    if (dish.dish_Availability && localQuantity > 0) {
      addCartItem({...dish, quantity: localQuantity})
    }
  }

  const handleIncrement = () => {
    if (dish.dish_Availability) {
      setLocalQuantity(prev => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (dish.dish_Availability && localQuantity > 0) {
      setLocalQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="item-container">
      <div className="v-nv">
        {dish.dish_Type && (
          <span
            className={`dish-type ${dish.dish_Type === 2 ? 'veg' : 'non-veg'}`}
          >
            {dish.dish_Type === 2 ? '🟢' : '🔴'}
          </span>
        )}
        <div className="dish-content">
          <div className="dish-info">
            <h1 className="dish-name" data-testid="dish-name">
              {dish.dish_name}
            </h1>
            <h3 className="dish-price">
              {dish.dish_currency} {dish.dish_price}
            </h3>
            <p className="dish-description">{dish.dish_description}</p>
            {!dish.dish_Availability && (
              <p className="unavailable-text">Not available</p>
            )}
          </div>

          {dish.dish_Availability && (
            <div className="dish-controls">
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  data-testid="decrement-button"
                  disabled={localQuantity === 0}
                >
                  -
                </button>
                <span data-testid="quantity">{localQuantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  data-testid="increment-button"
                >
                  +
                </button>
              </div>

              {localQuantity > 0 && (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  data-testid="add-to-cart"
                  aria-label="Add to cart"
                >
                  ADD TO CART
                </button>
              )}

              {dish.addonCat?.length > 0 && (
                <p className="customization">Customizations available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="dish-cal-img">
        {dish.dish_calories > 0 && (
          <h4 className="dish-calories">{dish.dish_calories} calories</h4>
        )}
        {dish.dish_image && (
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="dish-image"
            data-testid="dish-image"
          />
        )}
      </div>
    </div>
  )
}

export default DishItem
