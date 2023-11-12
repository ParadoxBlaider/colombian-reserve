import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralLayout from '../components/common/Layout/GeneralLayout';
import HotelTable from '../components/hotels/HotelTable';
import { createHotel, deleteHotel, detailsHotel, getHotels, setStatusHotel, updateHotel } from '../services/hotel/api';
import { useState } from 'react';
import { DataType } from '../services/hotel/types';
import { NoticeType } from 'antd/es/message/interface';
import { message } from 'antd';


interface HotelsPageProps {
  userLogued: boolean;
}

const HotelsPage: React.FC<HotelsPageProps> = ({ userLogued }) => {
  const navigate = useNavigate();
  const [dataHotels, setDataHotels] = useState<DataType[]>([])
  const [detailHotel, setDetailHotel] = useState<DataType | null>(null)
  const [messageApi, contextHolder] = message.useMessage();

  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const getDataHotels = async() => {
    try {
      const hotels = await getHotels();
      const newDataWithKeys = hotels.map((item: DataType, index: number) => ({ ...item, key: index + 1 }));
      setDataHotels(newDataWithKeys)
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const changeStatusHotel = async (id: number, status: boolean) => {
    try {
      const hotels = await setStatusHotel(id, { status });
      if (hotels) {
        getDataHotels()
        notificationAction(hotels.message, 'success')
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const createNewHotel = async (form: any) => {
    try {
      const hotels = await createHotel(form);
      if (hotels) {
        getDataHotels()
        notificationAction(hotels.message, 'success')
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const getDetailsHotel = async (id: number) => {
    try {
      const hotels = await detailsHotel(id);
      setDetailHotel(hotels)
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const updateDataHotel = async (id: number, data: any) => {
    try {
      const hotels = await updateHotel(id, data);
      if(hotels){
        notificationAction(hotels.message, 'success')
        getDataHotels()
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const deleteDataHotel = async (id: number) => {
    try {
      const hotels = await deleteHotel(id);
      if(hotels){
        getDataHotels()
        notificationAction(hotels.message, 'success')
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const cleanDataDetails = ()=>{
    setDetailHotel(null)
  }

  useEffect(() => {
    if (!userLogued) {
      navigate('/auth/login');
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getDataHotels()
  }, [navigate, userLogued]);

  // Render the component content based on the user's login status
  return userLogued ? (
    <GeneralLayout>
      <div>
        {contextHolder}
        <HotelTable
          dataHotels={dataHotels}
          changeStatusHotel={changeStatusHotel}
          createNewHotel={createNewHotel}
          getDetailsHotel={getDetailsHotel}
          cleanDataDetails={cleanDataDetails}
          detailHotel={detailHotel}
          updateDataHotel={updateDataHotel}
          deleteDataHotel={deleteDataHotel}
        />
      </div>
    </GeneralLayout>
  ) : <></>; // Empty fragment as an alternative to null
};

export default HotelsPage;