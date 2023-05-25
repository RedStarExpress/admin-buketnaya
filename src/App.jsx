import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Starter from './pages/Starter'
import Layout from './utils/Layout'
import Login from './pages/Login'
import Kategoriya from './pages/kategoriya/Kategoriya'
import SubKategoriya from './pages/sub_kategoriya/SubKategoriya'
import Flowers from './pages/flowers/Flowers'
import Blogs from './pages/blogs/Blogs'
import Korzinka from './pages/korzinka/Korzinka'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Starter />} />
      <Route path='/Категория' element={<Layout> <Kategoriya /></Layout>} />
      <Route path='/Подкатегория' element={<Layout> <SubKategoriya /></Layout>} />
      <Route path='/Цветы' element={<Layout> <Flowers /></Layout>} />
      <Route path='/Блог' element={<Layout> <Blogs /></Layout>} />
      <Route path='/Корзина' element={<Layout> <Korzinka /></Layout>} />
    </Routes>
  )
}

export default App