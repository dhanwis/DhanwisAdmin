import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './layout/Layout'
import Portfolio from './pages/Portfolio'
import Career from './pages/Career'
import { message } from 'antd'
import AdminLogin from './pages/AdminLogin'
import ProtectRoutes from './components/ProtectRoutes'

function App() {
  message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

  return (
    <div>
     <Routes>
      <Route path='/login' element={<AdminLogin/>}></Route>
      <Route element={<ProtectRoutes/>}>
      <Route element={<Layout/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/portfolio' element={<Portfolio/>} />
        <Route path='/careers' element={<Career/>} />
      </Route>
      </Route>
     </Routes>

    </div>
  )
}

export default App
