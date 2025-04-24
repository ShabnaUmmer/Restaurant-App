import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="empty-cart-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">Your cart is empty</h1>
    <p className="empty-cart-description">
      Add some delicious items to get started!
    </p>
    <Link to="/" className="shop-now-button">
      Shop Now
    </Link>
  </div>
)

export default EmptyCart
