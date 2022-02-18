import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom/NewRoom'
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room'
import { Page404 } from './pages/404'
import { AdminRoom } from './pages/AdminRoom'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
          <Route path='/admin/rooms/:id' element={<AdminRoom />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
