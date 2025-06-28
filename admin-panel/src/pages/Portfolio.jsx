import React, { useContext, useRef } from 'react';
import Headertab from '../components/commons/Headertab';
import AddPortfolio from '../components/portfolio/AddPortfolio';
import { DeleteFilled, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { PortfolioContext } from '../context/PortfolioContext';
import Modals from '../components/commons/Modal';
import EditPortfolio from '../components/portfolio/EditPorfolio';
function Portfolio() {
  const { portfolios, deletePortfolios } = useContext(PortfolioContext);

  const portfolioRef = useRef();

  const handleSubmit = () => {
    if (portfolioRef.current) {
      portfolioRef.current(); // Call handleSubmit from AddPortfolio
    }
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link) => (
        <a href={link} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
          {link}
        </a>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imgUrl) => (
        <img
          src={imgUrl}
          alt='project'
          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <div className='flex gap-2 items-center'>
          <Button
           variant="outlined"
             
            onClick={() => deletePortfolios(record.id)}
            className=' '
          >
            <DeleteOutlined />
          </Button>
          <Modals
            title={<EditOutlined />}
            ModalContent={EditPortfolio}
            initialValues={record}
            buttontype={'Update'}
          />


        </div>
      ),
    },
  ];

  return (
    <div className='space-y-4'>
      <Headertab buttontype={'Add Portfolio '} pagetitle={'Portfolio'} title={<PlusOutlined />} ModalContent={AddPortfolio} />

      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={portfolios.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
          scroll={{ x: 1000, y: 320 }}
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  padding: '12px',
                }}
              >
                <strong>Description:</strong>
                <p>{record.project_discription || 'No description available.'}</p>
              </div>
            ),
            rowExpandable: (record) => !!record.project_discription,
          }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default Portfolio;
