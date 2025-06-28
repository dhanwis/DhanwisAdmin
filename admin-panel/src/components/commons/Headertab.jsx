import React from 'react';
import Modals from './Modal';

function Headertab({ title, ModalContent ,buttontype,pagetitle}) {
  return (
    <div className='flex justify-between items-center'>
      <p className='text-2xl font-bold'>{pagetitle}</p>
      <Modals buttontype={buttontype} title={title} ModalContent={ModalContent} />
    </div>
  );
}

export default Headertab;
