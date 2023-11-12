import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralLayout from '../components/common/Layout/GeneralLayout';
import RoomsTable from '../components/rooms/RoomsTable';
import { getHotels } from '../services/hotel/api';
import { DataType, Rooms } from '../services/hotel/types';
import { createRoom, deleteRoom, setStatusRoom } from '../services/room/api';


interface RoomsPageProps {
  userLogued: boolean;
}

const RoomsPage: React.FC<RoomsPageProps> = ({ userLogued }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const navigate = useNavigate();
  const [dataHotels, setDataHotels] = useState<DataType[]>([])
  const [dataRooms, setDataRooms] = useState<Rooms[]>([])
  const [detailRoom] = useState(null)

  const getDataRooms =  async() => {
    try {
      const hotels = await getHotels();
      const newDataWithKeys = hotels.map((item: DataType, index: number) => {
        const updatedRooms = item.available_rooms.map((room: Rooms, roomIndex: number) => ({
          ...room,
          key: `${item.id}-${roomIndex + 1}`, // Utiliza una clave única para cada habitación
          hotel: {
            id: item.id,
            name: item.name
          },
        }));
        // Actualiza el array de available_rooms con las habitaciones modificadas
        return { ...item, available_rooms: updatedRooms };
      });
      if (newDataWithKeys) {
        setDataHotels(newDataWithKeys)
        const allAvailableRooms = newDataWithKeys.flatMap((hotel: DataType) => hotel.available_rooms);
        setDataRooms(allAvailableRooms)
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const changeStatusRoom = async (hotel_id: number, room_id: number, status: boolean) => {
    try {
      const hotels = await setStatusRoom(hotel_id, room_id, { status });
      if (hotels) {
        notificationAction(hotels.message, 'success')
        getDataRooms()
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const createNewRoom = async (form: any) => {
    try {
      const hotel_id = form.hotel_id
      delete form.hotel_id
      const room = await createRoom(hotel_id, form);
      if (room) {
        notificationAction(room.message, 'success')
        getDataRooms()
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }


  const getDetailsRoom = async (id: number) => {
    /* try {
      const hotels = await detailsHotel(id);
      setDetailHotel(hotels)
    } catch (error) {
      console.log(error)
    } */
  }

  const updateDataRoom = async (id: number, data: any) => {
    /* try {
      const hotels = await updateHotel(id, data);
      if(hotels){
        getDataHotels()
      }
    } catch (error) {
      console.log(error)
    } */
  }

  const deleteDataRoom = async (hotel_id: number, room_id: number) => {
    try {
      const room = await deleteRoom(hotel_id, room_id);
      if (room) {
        notificationAction(room.message, 'success')
        getDataRooms()
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const cleanDataDetails = () => {
    /*  setDetailHotel(null) */
  }

  useEffect(() => {
    if (!userLogued) {
      navigate('/auth/login');
      return
    }
    getDataRooms(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userLogued]);


  // Render the component content based on the user's login status
  return userLogued ? (
    <GeneralLayout>
      <div>
        {contextHolder}
        <RoomsTable
          dataRooms={dataRooms}
          dataHotels={dataHotels}
          changeStatusRoom={changeStatusRoom}
          createNewRoom={createNewRoom}
          getDetailsRoom={getDetailsRoom}
          cleanDataDetails={cleanDataDetails}
          detailRoom={detailRoom}
          updateDataRoom={updateDataRoom}
          deleteDataRoom={deleteDataRoom}
        />
      </div>
    </GeneralLayout>
  ) : <></>; // Empty fragment as an alternative to null
};

export default RoomsPage;