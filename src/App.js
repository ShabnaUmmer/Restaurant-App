import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CartProvider} from './Context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  </CartProvider>
)

export default App
