import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import CustomerRoutes from './utils/CustomerRoutes'

// import pages & components
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import CustomerNavbar from './components/organisms/CustomerNavbar'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashProfile from './pages/CustomerDashProfile'
import CustomerDashBooking from './pages/CustomerDashBooking'

function App() {

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
        <Route element={<CustomerRoutes />}>
          {/* Secondary Navbar */}
          <Route 
            path='/*'
            element={
              <>
                <CustomerNavbar />
                <Outlet />
              </>
            }
          >
            <Route path="customer-dash-profile" element={<CustomerDashProfile />} />
            <Route path="customer-dash-booking" element={<CustomerDashBooking />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
