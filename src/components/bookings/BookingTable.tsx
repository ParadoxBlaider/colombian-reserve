import React from 'react';
import { Avatar, Button, Card, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../../styles/hotel/index.css'
import { useState } from 'react';

import { DataBookings } from '../../services/booking/types';
import Meta from 'antd/es/card/Meta';



interface BookingTableProps {
  dataBookings: DataBookings[];
  getDetailsBooking: (id: number) => void;
  detailBooking: DataBookings | null;
}

const BookingTablePage: React.FC<BookingTableProps> = (
  {
    dataBookings,
    getDetailsBooking,
    detailBooking,
  }) => {
  const [modalDetailBooking, setModalDetailBooking] = useState<boolean>(false)

  const openModalDetailBooking = (booking_id: number) => {
    setModalDetailBooking(true)
    getDetailsBooking(booking_id)
  }

  const handleCancelModalDetailBooking = () => {
    setModalDetailBooking(false)
  }

  const columns: ColumnsType<DataBookings> = [
    {
      title: 'Hotel',
      width: 300,
      dataIndex: 'hotel',
      key: 'hotel',
      render: (_, { hotel }) => <span>{hotel.name}</span>,
    },
    {
      title: 'Habitación',
      width: 200,
      dataIndex: 'room',
      key: 'room',
      render: (_, { room }) => <span>{room.number}</span>,
    },
    {
      title: 'Fecha de entrada',
      width: 200,
      dataIndex: 'check_in_date',
      key: 'check_in',
    },
    {
      title: 'Fecha de salida',
      width: 200,
      dataIndex: 'check_out_date',
      key: 'check_in',
    },
    {
      title: 'Cantidad de personas',
      width: 200,
      dataIndex: 'quatity_people',
      key: 'quatity_people',
    },
    {
      title: 'Acciones',
      key: 'status',
      className: '!text-center',
      render: (_) => {
        return (
          <div className='gap-3 flex justify-center'>
            <Button className='bg-smart-talent !text-white' onClick={() => openModalDetailBooking(_.id)}>Ver detalles</Button>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      <Table className='general_table' columns={columns} dataSource={dataBookings} />
      <Modal className='' footer={null} title={`Detalles de la reserva`} open={modalDetailBooking} okText={'Guardar cambios'} centered /* onOk={handleOk} */ onCancel={handleCancelModalDetailBooking}>
        {
          detailBooking && (
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-3'>
                <div>
                  <h2 className='font-bold'>Nombre del hotel</h2>
                  <p>{detailBooking.hotel.name}</p>
                </div>
                <div>
                  <h2 className='font-bold'>Número de la habitación</h2>
                  <p>{detailBooking.room.number}</p>
                </div>
                <div>
                  <h2 className='font-bold'>Cantidad de personas</h2>
                  <p>{detailBooking.quatity_people}</p>
                </div>
              </div>
              <div>
                <h2 className='font-bold mb-3'>Huéspedes</h2>
                {
                  detailBooking.guests.map((guest) => (
                    <Card
                      className='mb-2'
                    >
                      <Meta
                        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                        title={`${guest.name} ${guest.last_name}`}
                        description={
                          <div>
                            <p><span className='font-bold text-xs'>Correo:</span> {guest.email}</p>
                            <p><span className='font-bold text-xs'>Tipo de documento:</span> {guest.type_document}</p>
                            <p><span className='font-bold text-xs'>Número documento:</span> {guest.document_number}</p>
                            <p><span className='font-bold text-xs'>Fecha de nacimiento:</span> {guest.birthdate}</p>
                            <p><span className='font-bold text-xs'>Teléfono:</span> {guest.cellphone}</p>
                            <p><span className='font-bold text-xs'>Genero:</span> {guest.genre}</p>
                          </div>
                        }
                      />
                    </Card>
                  ))
                }
              </div>
              <div>
                <h2 className='font-bold'>Datos de contacto de emergencia</h2>
                <p><span className='font-bold text-xs'>Nombres: </span>{detailBooking.emergency_contact.name}</p>
                <p><span className='font-bold text-xs'>Apellidos: </span>{detailBooking.emergency_contact.last_name}</p>
                <p><span className='font-bold text-xs'>Teléfono: </span>{detailBooking.emergency_contact.cellphone}</p>
              </div>
            </div>
          )
        }
      </Modal>
    </div>

  )
}

export default BookingTablePage