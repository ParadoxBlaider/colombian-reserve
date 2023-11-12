import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralLayout from '../components/common/Layout/GeneralLayout';
import HotelTable from '../components/hotels/HotelTable';
import { createHotel, detailsHotel, getHotels, setStatusHotel, updateHotel } from '../services/hotel/api';
import { useState } from 'react';
import { DataType } from '../services/hotel/types';


interface HotelsPageProps {
  userLogued: boolean;
}

const HotelsPage: React.FC<HotelsPageProps> = ({ userLogued }) => {
  const navigate = useNavigate();
  const [dataHotels, setDataHotels] = useState<DataType[]>([])
  const [detailHotel, setDetailHotel] = useState<DataType | null>(null)

  const getDataHotels = async () => {
    try {
      const hotels = await getHotels();
      console.log(hotels)
      const newDataWithKeys = hotels.map((item: DataType, index: number) => ({ ...item, key: index + 1 }));
      setDataHotels(newDataWithKeys)
    } catch (error) {
    }
  }

  const changeStatusHotel = async (id: number, status: boolean) => {
    try {
      const hotels = await setStatusHotel(id, { status });
      if (hotels) {
        getDataHotels()
      }
    } catch (error) {
    }
  }

  const createNewHotel = async (form: any) => {
    try {
      const hotels = await createHotel(form);

      if (hotels) {
        getDataHotels()
      }
    } catch (error) {
    }
  }

  const getDetailsHotel = async (id: number) => {
    try {
      const hotels = await detailsHotel(id);
      setDetailHotel(hotels)
    } catch (error) {
      console.log(error)
    }
  }

  const updateDataHotel = async (id: number, data: any) => {
    try {
      const hotels = await updateHotel(id, data);
      if(hotels){
        getDataHotels()
      }
    } catch (error) {
      console.log(error)
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
    getDataHotels()

  }, [navigate, userLogued]);

  // Render the component content based on the user's login status
  return userLogued ? (
    <GeneralLayout>
      <div>
        <HotelTable
          dataHotels={dataHotels}
          changeStatusHotel={changeStatusHotel}
          createNewHotel={createNewHotel}
          getDetailsHotel={getDetailsHotel}
          cleanDataDetails={cleanDataDetails}
          detailHotel={detailHotel}
          updateDataHotel={updateDataHotel}
        />
      </div>
    </GeneralLayout>
  ) : <></>; // Empty fragment as an alternative to null
};

export default HotelsPage;