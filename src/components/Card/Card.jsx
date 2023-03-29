import React, { useState } from 'react';

import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import { path } from '../../constants';

import { unixTimeStampToDate } from '../../utils/convertTime';
import { getReadableFileSizeString } from '../../utils/convertBytes';

import './index.css';


const Card = (props) => {
  const { image, filesize, timestamp, category } = props.item;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteItem = item => props.remove(item);

  const src = `${path}/${category}/${image}`;
  
  return (
    <div className="col-lg-2 col-sm-6">
      <div className='card'>
        <div className='closeButton'>
          <CloseButton onClick={() => handleDeleteItem(props.item)} />
        </div>
        <div className="thumbnail">
          <span  onClick={handleShow}>
            <Image thumbnail src={src} alt='#' />
          </span>
        </div>
        <div className='text'>{category}</div>
        <div className='text'>{image}</div>
        <div className='text'>{getReadableFileSizeString(filesize)}</div>
        <div className='text'>{unixTimeStampToDate(timestamp, 'LLLL')}</div> 
      </div>
      
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{category}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='imageContainer'>
          <img className='imgModal' src={src} alt='#' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Card;
