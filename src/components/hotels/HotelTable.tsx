import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../../styles/hotel/index.css'
import { DataType } from '../../services/hotel/types';
import { useState } from 'react';
import type { SelectProps } from 'antd';

import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ConfirmationModal from '../common/ConfirmationModal';



interface HotelTableProps {
  dataHotels: DataType[];
  changeStatusHotel: (id: number, status: boolean) => void;
  createNewHotel: (values: any) => void;
  getDetailsHotel: (id: number) => void;
  cleanDataDetails: () => void;
  detailHotel: DataType | null;
  updateDataHotel: (id: number, values: any) => void;
  deleteDataHotel: (id:number)=>void
}

const HotelTable: React.FC<HotelTableProps> = (
  {
    dataHotels,
    changeStatusHotel,
    createNewHotel,
    getDetailsHotel,
    cleanDataDetails,
    detailHotel,
    updateDataHotel,
    deleteDataHotel
  }) => {
  const [modalHotel, setModalHotel] = useState<boolean>(false)
  const [modalRooms, setModalRooms] = useState<boolean>(false)
  const [idHotel, setIdHotel] = useState<number | null>(null)
  const [formHotel] = Form.useForm();
  const [modalConfirm, setModalConfirm] = useState<boolean>(false)

  const options: SelectProps['options'] = [
    {
      label: '101',
      value: 1,
    },
    {
      label: '102',
      value: 2,
    },
    {
      label: '103',
      value: 3,
    },
    {
      label: '104',
      value: 4,
    },
  ];

  const openModalHotel = () => {
    setModalHotel(true)
    setIdHotel(null)
    formHotel.resetFields()
  }
  const openModalHotelWithDetail = (id: number) => {
    getDetailsHotel(id)
    setIdHotel(id)
    setModalHotel(true)
  }

  const openModalConfirm = (id: number) => {
    setIdHotel(id)
    setModalConfirm(true)
  }

  const onConfirm = () => {
    if(idHotel){
      deleteDataHotel(idHotel)
      setModalConfirm(false)
    }
  }

  const onCancel = () => {
    setIdHotel(null)
    setModalConfirm(false)
  }

  const openModalAssignRooms = (id: number) => {
    setModalRooms(true)
  }

  const handleCancelModalHotel = () => {
    setModalHotel(false)
    cleanDataDetails()
  }
  const handleCancelModalRooms = () => {
    setModalRooms(false)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: 300,
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ciudad',
      dataIndex: 'city',
      width: 200,
      key: 'city',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      width: 200,
      key: 'address',
    },
    {
      title: 'Habitaciones',
      dataIndex: 'rooms',
      width: 300,
      key: 'rooms',
      render: (_, { rooms }) => (
        <>
          {rooms.map((room, index) => {
            return (
              <Tag key={index}>
                {room.number}
              </Tag>
            );
          })}
          <Button className='p-0 !w-[22px] h-[22px]' onClick={() => openModalAssignRooms(_.id)} icon={<PlusOutlined className='w-[10px] text-black' />} />
        </>
      )
    },
    {
      title: 'Acciones',
      key: 'status',
      className: '!text-center',
      render: (_, { status }) => {
        let btn_action: React.ReactNode = <></>
        switch (status) {
          case false:
            btn_action = <Button icon={<CloseOutlined />} className='bg-red-500 !text-white' onClick={() => changeStatusHotel(_.id, true)}>Deshabilitar</Button>
            break;
          case true:
            btn_action = <Button icon={<CheckOutlined />} className='bg-green-500 !text-white' onClick={() => changeStatusHotel(_.id, false)}>Habilitar</Button>
            break;
          default:
            break;
        }
        return (
          <div className='gap-3 flex justify-center'>
            <Button className='bg-blue-900 !text-white' onClick={() => openModalHotelWithDetail(_.id)}>Editar</Button>
            {btn_action}
            <Button className='bg-red-600 !text-white' onClick={() => openModalConfirm(_.id)}>Eliminar</Button>
          </div>
        )
      }
    },
  ];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    if (idHotel) {
      updateDataHotel(idHotel, values)
    } else {
      createNewHotel(values)
      formHotel.resetFields()
    }
    handleCancelModalHotel()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (detailHotel) {
      console.log(detailHotel)
      formHotel.setFieldsValue({
        name: detailHotel.name,
        city: detailHotel.city,
        address: detailHotel.address
      })
    }
    return () => {
    }
  }, [detailHotel, formHotel])

  return (
    <div>
      <div className='flex mb-4'>
        <div className='flex-1'></div>
        <Button className='bg-smart-talent !text-white' onClick={openModalHotel}>Crear Hotel</Button>
      </div>
      <Table className='general_table' columns={columns} dataSource={dataHotels} />

      <Modal className='modal-hotel' footer={null} title={`${idHotel ? 'Actualizar' : 'Crear nuevo'} hotel`} open={modalHotel} okText={'Guardar cambios'} centered /* onOk={handleOk} */ onCancel={handleCancelModalHotel}>
        <Form
          form={formHotel}
          name="basic"
          layout="vertical"
          className='modal-hotel__form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="name"
            className='mb-4'
            rules={[{ required: true, message: 'Porfavor registra un nombre de hotel' }]}
          >
            <Input />
          </Form.Item>
          <div className='grid grid-cols-2 gap-4'>
            <Form.Item
              label="Ciudad"
              name="city"
              className='mb-4'
              rules={[{ required: true, message: 'Porfavor registra la ciudad' }]}
            >
              <Select
                onChange={handleChange}
                options={[
                  { value: 'Bogotá', label: 'Bogotá' },
                  { value: 'Medellín', label: 'Medellín' },
                  { value: 'Ibagué', label: 'Ibagué' },
                  { value: 'Popayán', label: 'Popayán' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Dirección"
              name="address"
              className='mb-4'
              rules={[{ required: true, message: 'Porfavor registra la dirección' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className='ant-modal-footer'>
            <Button htmlType="button" className="ant-btn-default !text-black" onClick={handleCancelModalHotel}>Cancelar</Button>
            <Button htmlType="submit" className="ant-btn-primary modal-hotel__main_action">Guardar cambios</Button>
          </div>
        </Form>
      </Modal>

      <Modal className='modal-hotel-rooms' okButtonProps={{ className: 'modal-hotel__main_action' }} title="Habitaciones" open={modalRooms} okText={'Guardar cambios'} centered /* onOk={handleOk} */ onCancel={handleCancelModalRooms}>
        <Space style={{ width: '100%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Porfavor seleccione las habitaciones"
            /* defaultValue={} */
            onChange={handleChange}
            options={options}
          />
        </Space>
      </Modal>

      <ConfirmationModal visible={modalConfirm} onConfirm={onConfirm} onCancel={onCancel} />
    </div>

  )
}

export default HotelTable