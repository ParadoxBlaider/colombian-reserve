import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralLayout from '../components/common/Layout/GeneralLayout';


interface BookingsPageProps {
  userLogued: boolean;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ userLogued }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogued) {
      navigate('/auth/login');
    }
  }, []);

  // Render the component content based on the user's login status
  return userLogued ? (
    <GeneralLayout>
      <div>
        <h2 className="">Welcome to the Bookings Page</h2>
        <p className="text-orange-300">This is the content of the home page.</p>
      </div>
    </GeneralLayout>
  ) : <></>; // Empty fragment as an alternative to null
};

export default BookingsPage;