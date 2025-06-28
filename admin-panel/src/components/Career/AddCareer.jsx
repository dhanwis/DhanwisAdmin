import React, { useContext, useImperativeHandle, forwardRef } from 'react';
import { Form, Select, Input, message } from 'antd';
import { CareerContext } from '../../context/CareerContext';

const { Option } = Select;
const { TextArea } = Input;

const AddCareer = forwardRef((props, ref) => {
  const { createCareer } = useContext(CareerContext);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Manual validation like AddPortfolio
      const result = await createCareer(values);

      if (result.success) {
        message.success(result.message || 'Career added successfully!');
        form.resetFields();
      } else {
        message.error(result.message || 'Failed to add career');
      }

      return true;
    } catch (errorInfo) {
      // Validation failed
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <div className="bg-white">
      <Form form={form} layout="vertical">
        <Form.Item
          name="job"
          label="Select Category"
          rules={[{ required: true, message: 'Please select a job role' }]}
        >
          <Select placeholder="Select one">
            <Option value="Python Developer">Python Developer</Option>
            <Option value="Mern Stack">MERN Stack</Option>
            <Option value="Digital Marketing">Digital Marketing</Option>
            <Option value="Graphic Design">Graphic Designer</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="discription"
          label="Career Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <TextArea rows={6} placeholder="Enter career description" />
        </Form.Item>
      </Form>
    </div>
  );
});

export default AddCareer;
