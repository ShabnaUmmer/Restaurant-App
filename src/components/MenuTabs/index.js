import './index.css'

const MenuTabs = ({categories, activeTab, setActiveTab}) => (
  <ul className="menu-tab-container">
    {categories.map((category, index) => (
      <li>
        <button
          key={category.menu_category_id}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => setActiveTab(index)}
          type="button"
        >
          {category.menu_category}
        </button>
      </li>
    ))}
  </ul>
)
export default MenuTabs
