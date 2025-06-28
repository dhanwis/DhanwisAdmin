import React from 'react'
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';



function Tables({columns,data}) {
    
  return (
   <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
  )
}

export default Tables
