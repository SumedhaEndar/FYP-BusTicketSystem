import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// import pages & components
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashProfile from './pages/CustomerDashProfile'
import CustomerRoutes from './utils/CustomerRoutes'

function App() {
  const { user } = useAuthContext()
  console.log(user)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route 
          path='/' 
          element={<Home />} 
        />
        <Route 
          path='/customer-register' 
          element={<CustomerRegister />} 
        />
        <Route 
          path='/customer-login' 
          element={<CustomerLogin />} 
        />

        <Route element={<CustomerRoutes/>}>
          <Route 
            path='/customer-dash-profile'
            element={<CustomerDashProfile />}
          />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
