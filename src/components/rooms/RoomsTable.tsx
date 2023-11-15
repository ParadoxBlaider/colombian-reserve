import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../../styles/hotel/index.css'
import { DataType, Rooms } from '../../services/hotel/types';
import { useState } from 'react';

import {
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ConfirmationModal from '../common/ConfirmationModal';
import { formatterMoney } from '../../utils';



interface HotelTableProps {
  dataRooms: Rooms[];
  dataHotels: DataType[];
  changeStatusRoom: (hotel_id: number, room_id: number, status: boolean) => void;
  createNewRoom: (values: any) => void;
  getDetailsRoom: (hotel_id: number, room_id: number) => void;
  cleanDataDetails: () => void;
  detailRoom: any;
  updateDataRoom: (hotel_id: number, room_id: number, values: any) => void;
  deleteDataRoom: (hotel_id: number, room_id: number) => void
}

const RoomsTable: React.FC<HotelTableProps> = (
  {
    dataRooms,
    dataHotels,
    changeStatusRoom,
    createNewRoom,
    getDetailsRoom,
    cleanDataDetails,
    detailRoom,
    updateDataRoom,
    deleteDataRoom
  }) => {
  const [modalRoom, setModalRoom] = useState<boolean>(false)
  const [idHotel, setIdHotel] = useState<number | null>(null)
  const [idRoom, setIdRoom] = useState<number | null>(null)
  const [formRoom] = Form.useForm();
  const [modalConfirm, setModalConfirm] = useState<boolean>(false)


  const openModalRoom = () => {
    setModalRoom(true)
    setIdHotel(null)
    setIdRoom(null)
    formRoom.resetFields()
  }
  const openModalRoomWithDetail = (hote_id: number, room_id: number) => {
    getDetailsRoom(hote_id, room_id)
    setIdHotel(hote_id)
    setIdRoom(room_id)
    setModalRoom(true)
  }

  const openModalConfirm = (hote_id: number, room_id: number) => {
    setIdHotel(hote_id)
    setIdRoom(room_id)
    setModalConfirm(true)
  }

  const onConfirm = () => {
    if (idHotel && idRoom) {
      deleteDataRoom(idHotel, idRoom)
      setModalConfirm(false)
    }
  }

  const onCancel = () => {
    setIdRoom(null)
    setModalConfirm(false)
  }

  const handleCancelModalRoom = () => {
    setModalRoom(false)
    cleanDataDetails()
  }

  const columns: ColumnsType<Rooms> = [
    {
      title: 'Habitación',
      dataIndex: 'number',
      width: 200,
      key: 'name',
      className:'!text-center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      width: 200,
      key: 'city',
    },
    {
      title: 'Tipo de habitación',
      dataIndex: 'type',
      width: 100,
      key: 'type',
    },
    {
      title: 'Máximo de personas',
      dataIndex: 'max_people',
      className: '!text-center',
      width: 200,
      key: 'max_people',
    },
    {
      title: 'Precio',
      dataIndex: 'base_price',
      width: 200,
      key: 'base_price',
      render: (_, { base_price }) => {
        return (
          <span>{formatterMoney.format(base_price)}</span>
        )
      }
    },
    {
      title: 'Hotel',
      dataIndex: 'hotel',
      width: 300,
      key: 'hotel',
      render: (_, { hotel }) => {
        return (
          <span>{hotel.name}</span>
        )
      }
    },
    {
      title: 'Acciones',
      key: 'status',
      className: '!text-center',
      fixed: 'right',
      render: (_, { status }) => {
        let btn_action: React.ReactNode = <></>
        switch (status) {
          case false:
            btn_action = <Button icon={<CloseOutlined />} className='bg-red-500 !text-white' onClick={() => changeStatusRoom(_.hotel.id, _.id, true)}>Deshabilitar</Button>
            break;
          case true:
            btn_action = <Button icon={<CheckOutlined />} className='bg-green-500 !text-white' onClick={() => changeStatusRoom(_.hotel.id, _.id, false)}>Habilitar</Button>
            break;
          default:
            break;
        }
        return (
          <div className='gap-3 flex justify-center'>
            <Button className='bg-blue-900 !text-white' onClick={() => openModalRoomWithDetail(_.hotel.id,_.id)}>Editar</Button>
            {btn_action}
            <Button className='bg-red-600 !text-white' onClick={() => openModalConfirm(_.hotel.id, _.id)}>Eliminar</Button>
          </div>
        )
      }
    },
  ];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    if (idHotel && idRoom) {
      updateDataRoom(idHotel, idRoom, values)
    } else {
      createNewRoom(values)
      formRoom.resetFields()
    }
    handleCancelModalRoom()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (detailRoom) {
      formRoom.setFieldsValue({
        hotel_id: detailRoom.hotel.id,
        number: detailRoom.number,
        base_price: detailRoom.base_price,
        location: detailRoom.location,
        tax: detailRoom.tax,
        type: detailRoom.type,
        max_people: detailRoom.max_people,
      })
    }
    return () => {
    }
  }, [detailRoom, formRoom, dataHotels])

  return (
    <div>
      <div className='flex mb-4'>
        <div className='flex-1'></div>
        <Button className='bg-smart-talent !text-white' onClick={openModalRoom}>Crear habitación</Button>
      </div>
      <Table className='general_table' columns={columns} dataSource={dataRooms} />

      <Modal className='modal-hotel' footer={null} title={`${idRoom ? 'Actualizar' : 'Crear nueva'} habitación`} open={modalRoom} okText={'Guardar cambios'} centered /* onOk={handleOk} */ onCancel={handleCancelModalRoom}>
        <Form
          form={formRoom}
          name="basic"
          layout="vertical"
          className='modal-hotel__form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Hotel"
            name="hotel_id"
            className='mb-4'
            rules={[{ required: true, message: 'Por favor elige un hotel' }]}
          >
            <Select
            disabled={idRoom ? true : false}
              onChange={handleChange}
              placeholder='Selecciona un hotel'
            >
              {
                dataHotels.map((hotel, index) => (
                  <Select.Option key={index} value={hotel.id}>{hotel.name}</Select.Option>
                ))
              }
            </Select>

          </Form.Item>
          <div className='grid grid-cols-2 gap-3'>
            <Form.Item
              label="Número de habitación"
              name="number"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra un número de habitación' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Precio base"
              name="base_price"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra un precio base' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Ubicación"
              name="location"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra una ubicación' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tipo de habitación"
              name="type"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor elige el tipo de habitación' }]}
            >
              <Select
                onChange={handleChange}
                placeholder='Selecciona un tipo de habitación'
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Doble', label: 'Doble' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Impuesto"
              name="tax"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra un impuesto' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Cantidad de personas"
              name="max_people"
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra la cantidad de personas que tendrá la habitación' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
          </div>
          <div className='ant-modal-footer'>
            <Button htmlType="button" className="ant-btn-default !text-black" onClick={handleCancelModalRoom}>Cancelar</Button>
            <Button htmlType="submit" className="ant-btn-primary modal-hotel__main_action">Guardar cambios</Button>
          </div>
        </Form>
      </Modal>

      {/* <Modal className='modal-hotel-rooms' okButtonProps={{ className: 'modal-hotel__main_action' }} title="Habitaciones" open={modalRooms} okText={'Guardar cambios'} centered onCancel={handleCancelModalRooms}>
        <Space style={{ width: '100%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Por favor seleccione las habitaciones"
            onChange={handleChange}
            options={options}
          />
        </Space>
      </Modal> */}

      <ConfirmationModal visible={modalConfirm} onConfirm={onConfirm} onCancel={onCancel} />
    </div>

  )
}

export default RoomsTable