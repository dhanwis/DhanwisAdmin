import React from 'react';
import { Input } from 'antd';
const InputField = ({onchange,placeholder}) =>
    
    <Input onChange={onchange} placeholder={placeholder} />;


export default InputField;