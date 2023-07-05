import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import CustomerRoutes from './utils/CustomerRoutes'
import AdminRoutes from './utils/AdminRoutes'
import PartnerRoutes from './utils/PartnerRoutes'

// import pages & components
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import AskMB from './pages/AskMB'
import AboutUs from './pages/AboutUs'
import Enrich from './pages/Enrich'
import Experience from './pages/Experience'
import BusSchedule from './pages/BusSchedule'
import Payment from './pages/Payment'
import CustomerNavbar from './components/organisms/CustomerNavbar'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashProfile from './pages/CustomerDashProfile'
import CustomerDashBooking from './pages/CustomerDashBooking'
import CustomerDashReschedule from './pages/CustomerDashReschedule'
import AdminNavbar from './components/organisms/AdminNavbar'
import AdminLogin from './pages/AdminLogin'
import AdminDashProfile from './pages/AdminDashProfile'
import AdminDashEmployee from './pages/AdminDashEmployee'
import AdminDashFeedback from './pages/AdminDashFeedback'
import AdminDashOthers from './pages/AdminDashOthers'
import AdminDashRequests from './pages/AdminDashRequests'
import PartnerNavbar from './components/organisms/PartnerNavbar'
import PartnerDashProfile from './pages/PartnerDashProfile'
import PartnerDashRoutes from './pages/PartnerDashRoutes'
import PartnerDashPlans from './pages/PartnerDashPlans'
import PartnerRegister from './pages/PartnerRegister'
import PartnerLogin from './pages/PartnerLogin'
import PartnerDashLogo from './pages/PartnerDashLogo'

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
          path='/experience'
          element={<Experience />}
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
          path='/bus-schedule'
          element={<BusSchedule />}
        />
        <Route 
          path='/payment'
          element={<Payment />}
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
        <Route 
          path='/partner-register'
          element={<PartnerRegister />}
        />
        <Route 
          path='/partner-login'
          element={<PartnerLogin />}
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
            <Route path="customer-dash-reschedule" element={<CustomerDashReschedule/>} />
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
            <Route path="admin-dash-requests" element={<AdminDashRequests />} />
          </Route>
        </Route>
        <Route element={<PartnerRoutes />}>
          {/* Partner Navbar */}
          <Route 
            path='/*'
            element={
              <>
                <PartnerNavbar />
                <Outlet />
              </>
            }
          >
            <Route path="partner-dash-profile" element={<PartnerDashProfile />} />
            <Route path="partner-dash-routes" element={<PartnerDashRoutes />} />
            <Route path="partner-dash-plans" element={<PartnerDashPlans />} />
            <Route path="partner-dash-add-logo" element={<PartnerDashLogo />}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
