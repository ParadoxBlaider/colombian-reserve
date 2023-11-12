import { Modal } from 'antd';
import React from 'react';
import '../../styles/hotel/index.css'
import {
  WarningOutlined
} from '@ant-design/icons';

interface HotelTableProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<HotelTableProps> = ({ visible, onConfirm, onCancel }) => {

  return (
    <Modal
      centered
      width={300}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirmar"
      cancelButtonProps={{ className: '!text-black' }}
      okButtonProps={{ className: '!bg-smart-talent' }}
      cancelText="Cancelar"
    >
      <div className='text-center'>
        <WarningOutlined className='text-red-600 text-5xl mb-4' />
        <h2 className='font-semibold'>¿Está seguro que desea continuar?</h2>
      </div>
    </Modal>
  )
}

export default ConfirmationModal