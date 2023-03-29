import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import { path } from '../../constants';

import './index.css';

const TreeView = ({ data }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <>
          {Object.keys(data).map(category => (
            <Row>
              <Col sm={1}>
                <ListGroup>
                  <ListGroup.Item action href={`#${category}`}>
                    {category}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey={`#${category}`}>
                    <ListGroup horizontal>
                      <ListGroup.Item>
                        {data[category].map(item => (
                          <div
                            className='imageBox'
                            onClick={handleShow} 
                            key={item.timestamp}
                          >
                            <Image
                              className='thumbnail'
                              thumbnail
                              src={`${path}/${category}/${item.image}`}
                              onClick={() => setModalData({category, src: `${path}/${category}/${item.image}` })}
                            />
                          </div>
                        ))}
                      </ListGroup.Item>
                    </ListGroup>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          ))}
        </>
      </Tab.Container>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='imageContainer'>
          <img className='imgModal' src={modalData.src} alt='#' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TreeView;
