import React, { useContext } from 'react';
import Headertab from '../components/commons/Headertab';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import AddCareer from '../components/Career/AddCareer';
import { Table, Button } from 'antd';
import { CareerContext } from '../context/CareerContext';
import Modals from '../components/commons/Modal';
import EditCareer from '../components/Career/EditCareer';

function Career() {
  const { careers,deleteCareer } = useContext(CareerContext);
  console.log(careers);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'job',
      key: 'job',
    },
    {
      title: 'Description',
      dataIndex: 'discription',
      key: 'discription',
      render: (text) => (
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {text || 'No description available.'}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='flex gap-2'>
        <Button  onClick={() =>deleteCareer(record.id) }>
          <DeleteOutlined />
        </Button>
        <Modals
            title={<EditOutlined />}
            ModalContent={EditCareer}
            initialValues={record}
            buttontype={'Update'}
          />
          </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Headertab
        pagetitle={'Career'}
        buttontype={'Add Career'}
        title={<PlusOutlined />}
        ModalContent={AddCareer}
      />
      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={careers.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default Career;
