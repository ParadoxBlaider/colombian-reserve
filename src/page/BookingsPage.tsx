import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingTablePage from '../components/bookings/BookingTable';
import GeneralLayout from '../components/common/Layout/GeneralLayout';
import { detailsBooking, getBookings } from '../services/booking/api';
import { DataBookings } from '../services/booking/types';

interface BookingsPageProps {
  userLogued: boolean;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ userLogued }) => {
  const navigate = useNavigate();
  const [dataBookings, setDataBooking] = useState<DataBookings[]>([])
  const [detailBooking, setDetailBooking] = useState<DataBookings | null>(null)
  const [messageApi, contextHolder] = message.useMessage();

  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const getDataBookings = async() => {
    try {
      const data = await getBookings();
      const newDataWithKeys = data.bookings.map((item: DataBookings, index: number) => ({ ...item, key: index + 1 }));
      setDataBooking(newDataWithKeys)
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const getDetailsBooking = async (booking_id: number) => {
    try {
      const data = await detailsBooking(booking_id);
      if(data){
        setDetailBooking(data.booking)
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  useEffect(() => {
    if (!userLogued) {
      navigate('/auth/login');
      return
    }
    getDataBookings(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userLogued]);

  return userLogued ? (
    <GeneralLayout>
      <div>
        {contextHolder}
        <BookingTablePage
          dataBookings={dataBookings}
          getDetailsBooking={getDetailsBooking}
          detailBooking={detailBooking}
        />
      </div>
    </GeneralLayout>
  ) : <></>;
};

export default BookingsPage;