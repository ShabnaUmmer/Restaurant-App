import {useContext, useState, useEffect} from 'react'
import {CartContext} from '../../Context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const cartItem = cartList.find(item => item.dish_id === dish.dish_id)
  const [localQty, setLocalQty] = useState(0)

  useEffect(() => {
    if (cartItem) {
      setLocalQty(cartItem.quantity)
    }
  }, [cartItem])

  const quantityToDisplay = cartItem ? cartItem.quantity : localQty

  const handleIncrement = () => {
    if (!dish.dish_Availability) return

    if (cartItem) {
      incrementCartItemQuantity(dish.dish_id)
    } else {
      setLocalQty(prev => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (!dish.dish_Availability) return

    if (cartItem && cartItem.quantity > 0) {
      decrementCartItemQuantity(dish.dish_id)
    } else if (!cartItem && localQty > 0) {
      setLocalQty(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (dish.dish_Availability && quantityToDisplay > 0) {
      if (cartItem) {
        const diff = localQty - cartItem.quantity
        if (diff > 0) {
          for (let i = 0; i < diff; i += 1) {
            incrementCartItemQuantity(dish.dish_id)
          }
        } else if (diff < 0) {
          for (let i = 0; i < -diff; i += 1) {
            decrementCartItemQuantity(dish.dish_id)
          }
        }
      } else {
        addCartItem({...dish, quantity: localQty})
      }
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
            <h1 className="dish-name">{dish.dish_name}</h1>
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
                  data-testid="minus"
                  aria-label="decrement"
                >
                  -
                </button>
                <p data-testid="active-count">{quantityToDisplay}</p>
                <button
                  type="button"
                  onClick={handleIncrement}
                  data-testid="plus"
                  aria-label="increment"
                >
                  +
                </button>
              </div>

              {dish.dish_Availability && quantityToDisplay > 0 && (
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  data-testid="add-to-cart"
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
