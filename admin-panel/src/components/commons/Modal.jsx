import React, { useRef } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Modals = ({ title, ModalContent, initialValues,buttontype }) => {
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const childRef = useRef();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const success = await childRef.current?.submit?.();
      if (success) {
        message.success('Portfolio updated!');
        setOpen(false);
      }
    } catch (err) {
      message.error('An error occurred.');
      console.error(err);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Button  icon={title} onClick={showModal} />
      <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={buttontype}
      >
        <ModalContent ref={childRef} initialValues={initialValues} />
      </Modal>
    </>
  );
};


export default Modals;
