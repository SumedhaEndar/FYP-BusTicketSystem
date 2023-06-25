import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import CustomerRoutes from './utils/CustomerRoutes'
import AdminRoutes from './utils/AdminRoutes'

// import pages & components
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import CustomerNavbar from './components/organisms/CustomerNavbar'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashProfile from './pages/CustomerDashProfile'
import CustomerDashBooking from './pages/CustomerDashBooking'
import AdminNavbar from './components/organisms/AdminNavbar'
import AdminLogin from './pages/AdminLogin'
import AdminDashProfile from './pages/AdminDashProfile'
import AdminDashEmployee from './pages/AdminDashEmployee'
import AskMB from './pages/AskMB'
import AboutUs from './pages/AboutUs'
import AdminDashFeedback from './pages/AdminDashFeedback'
import AdminDashOthers from './pages/AdminDashOthers'
import Enrich from './pages/Enrich'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Everyone can view */}
        <Route 
          path='/' 
          element={<Home />} 
        />
        <Route 
          path='/enrich'
          element={<Enrich />}
        />
        <Route 
          path='/about-us'
          element={<AboutUs />}
        />
        <Route 
          path='/askMB' 
          element={<AskMB />} 
        />
        <Route 
          path='/customer-register' 
          element={<CustomerRegister />} 
        />
        <Route 
          path='/customer-login' 
          element={<CustomerLogin />} 
        />
        <Route 
          path='/admin-login' 
          element={<AdminLogin />} 
        />
        <Route element={<CustomerRoutes />}>
          {/* Customer Navbar */}
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
        <Route element={<AdminRoutes />}>
          {/* Admin Navbar */}
          <Route 
            path='/*'
            element={
              <>
                <AdminNavbar />
                <Outlet />
              </>
            }
          >
            <Route path="admin-dash-employee" element={<AdminDashEmployee />} />
            <Route path="admin-dash-profile" element={<AdminDashProfile />} />
            <Route path="admin-dash-feedback" element={<AdminDashFeedback />} />
            <Route path="admin-dash-others" element={<AdminDashOthers />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
