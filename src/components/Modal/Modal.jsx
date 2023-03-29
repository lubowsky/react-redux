import React from 'react';

import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ImageModal = ({ show, handleClose, category, src }) => {
  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{category}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='imageContainer'>
        <Image className='imgModal' src={src} alt='#' />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
