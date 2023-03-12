import { useRoutes } from 'react-router-dom'
import HomePage from './pages/home'

const routes = [
  {
    path: '/',
    element: <HomePage />,
  }
]

const AppRoutes = () => {
  const RouteElement = useRoutes(routes)
  return RouteElement
}

export default AppRoutes;