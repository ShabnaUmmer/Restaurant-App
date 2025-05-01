import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {CartContext} from '../../Context/CartContext'
import Navbar from '../Navbar'
import DishItem from '../DishItem'
import MenuTabs from '../MenuTabs'

/* eslint-disable camelcase */

const Home = () => {
  const [restaurantData, setRestaurantData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  const {cartList, setRestaurantName} = useContext(CartContext)

  const FetchMenuData = async () => {
    const apiLink =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiLink)
    if (response.ok) {
      const data = await response.json()
      return data[0]
    }
    throw new Error('Failed to fetch data')
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await FetchMenuData()
        setRestaurantData(data)
        setRestaurantName(data.restaurant_name)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      }
    }
    loadData()
  }, [setRestaurantName])

  if (!restaurantData) {
    return (
      <div className="loading" data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} />
      </div>
    )
  }

  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)
  const {restaurant_name, restaurant_image, table_menu_list} = restaurantData
  const activeCategory = table_menu_list[activeTab]

  return (
    <div className="app">
      <header>
        <Navbar count={totalItems} restaurant_name={restaurant_name} />
      </header>

      {restaurant_image && (
        <div className="restaurant-hero">
          <img
            src={restaurant_image}
            alt={restaurant_name}
            className="restaurant-image"
          />
        </div>
      )}

      <MenuTabs
        categories={table_menu_list}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="menu-content">
        <div className="dish-list">
          {activeCategory.category_dishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              quantity={
                cartList.find(item => item.dish_id === dish.dish_id)
                  ?.quantity || 0
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
