import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BookingsPage from '../page/BookingsPage';
import HotelsPage from '../page/HotelsPage';
import LoginPage from '../page/LoginPage';
import NotFoundPage from '../page/NotFoundPage';
import RoomsPage from '../page/RoomsPage';
import { isAuthenticated } from '../services/auth/api';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/" element={<HotelsPage userLogued={isAuthenticated()} />} />
        <Route path="/hotels" element={<HotelsPage userLogued={isAuthenticated()} />} />
        <Route path="/rooms" element={<RoomsPage userLogued={isAuthenticated()} />} />
        <Route path="/bookings" element={<BookingsPage userLogued={isAuthenticated()} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;