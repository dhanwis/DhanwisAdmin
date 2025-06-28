import React, { useContext, useImperativeHandle, useState, forwardRef } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Button, Input, Upload, Radio, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PortfolioContext } from '../../context/PortfolioContext';

const AddPortfolio = forwardRef((props, ref) => {
  const [project_name, setProjectName] = useState('');
  const [link, setProjectLink] = useState('');
  const [project_discription, setDescription] = useState('');
  const [work_options, setCategory] = useState('Website');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const { addPortfolio } = useContext(PortfolioContext);

  const handleBeforeUpload = (file) => {
    setImageFile(file);
    setErrors(prev => ({ ...prev, image: null }));
    return false;
  };

  const handleRemove = () => {
    setImageFile(null);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!project_name.trim()) newErrors.project_name = 'Project name is required.';
    if (!link.trim()) newErrors.link = 'Project link is required.';
    if (!project_discription.trim()) newErrors.project_discription = 'Project description is required.';
    if (!imageFile) newErrors.image = 'Please upload an image.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateFields();
    if (!isValid) return false;

    const formData = new FormData();
    formData.append('project_name', project_name);
    formData.append('link', link);
    formData.append('project_discription', project_discription);
    formData.append('work', work_options);
    formData.append('image', imageFile);

    addPortfolio(formData);

    // Reset fields
    setProjectName('');
    setProjectLink('');
    setDescription('');
    setCategory('Website');
    setImageFile(null);
    setErrors({});

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <Form layout="vertical" className="space-y-2">
      <Form.Item
        label="Project Name"
        validateStatus={errors.project_name && 'error'}
        help={errors.project_name}
      >
        <Input
          placeholder="Enter Project Name"
          value={project_name}
          onChange={(e) => {
            setProjectName(e.target.value);
            setErrors(prev => ({ ...prev, project_name: null }));
          }}
        />
      </Form.Item>

      <Form.Item
        label="Project Link"
        validateStatus={errors.link && 'error'}
        help={errors.link}
      >
        <Input
          placeholder="Project Link (www.xyz.com)"
          value={link}
          onChange={(e) => {
            setProjectLink(e.target.value);
            setErrors(prev => ({ ...prev, link: null }));
          }}
        />
      </Form.Item>

      <Form.Item
        label="Project Description"
        validateStatus={errors.project_discription && 'error'}
        help={errors.project_discription}
      >
        <TextArea
          rows={4}
          maxLength={500}
          placeholder="Project Description"
          value={project_discription}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors(prev => ({ ...prev, project_discription: null }));
          }}
        />
      </Form.Item>

      <Form.Item label="Category">
        <Radio.Group
          onChange={(e) => setCategory(e.target.value)}
          value={work_options}
        >
          <Radio value="website">Website</Radio>
          <Radio value="graphic design">Digital Marketing</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Upload Image"
        validateStatus={errors.image && 'error'}
        help={errors.image}
      >
        <Upload
          accept="image/*"
          beforeUpload={handleBeforeUpload}
          onRemove={handleRemove}
          fileList={
            imageFile
              ? [{
                  uid: '-1',
                  name: imageFile.name,
                  status: 'done',
                  url: URL.createObjectURL(imageFile),
                }]
              : []
          }
          maxCount={1}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
});

export default AddPortfolio;
