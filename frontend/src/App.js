import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import pages & components
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customer-register' element={<CustomerRegister />} />
        <Route path='/customer-login' element={<CustomerLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
