import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Tetoviranje from './pages/Tetoviranje'
import Odstranjevanje from './pages/Odstranjevanje'
import Obrvi from './pages/Obrvi'
import Cenik from './pages/Cenik'
import Booking from './pages/Booking'
import Galerija from './pages/Galerija'
import Admin from './pages/Admin'

function AppInner() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tetoviranje" element={<Tetoviranje />} />
            <Route path="/odstranjevanje" element={<Odstranjevanje />} />
            <Route path="/obrvi" element={<Obrvi />} />
            <Route path="/cenik" element={<Cenik />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/galerija" element={<Galerija />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <BrowserRouter>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <AppInner />
    </BrowserRouter>
  )
}