
import './index.css'

const DishItem = ({dish, updateCart, quantity}) => {
   const handleIncrement = () => {
    if (dish.dish_Availability) {
      updateCart(dish.dish_id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (dish.dish_Availability && quantity > 0) {
      updateCart(dish.dish_id, quantity - 1);
    }
  };

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
                <button onClick={handleDecrement}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
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
          />
        )}
      </div>
    </div>
  )
}

export default DishItem
