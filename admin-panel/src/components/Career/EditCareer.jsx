import React, { useContext, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Select, Input, message } from 'antd';
import { CareerContext } from '../../context/CareerContext';

const { Option } = Select;
const { TextArea } = Input;

const EditCareer = forwardRef(({ initialValues }, ref) => {
  const { updateCareer } = useContext(CareerContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const result = await updateCareer(initialValues.id, values);

      if (result.success) {
        message.success(result.message || 'Career updated successfully!');
      } else {
        message.error(result.message || 'Failed to update career');
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

export default EditCareer;
