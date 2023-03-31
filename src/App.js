import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SetCookie from './hooks/setCookie';
import RemoveCookie from './hooks/removeCookie';
import GetCookie from './hooks/getCookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import convertTree from './utils/convertTree';

import ListCards from './components/ListCards/ListCards';
import Pagination from './components/Pagination/Pagination';
import TreeView from './components/TreeView/TreeView';

import './App.css';


function App() {
  const [posts, setPosts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cardsView, setCardsView] = useState(true);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [dataForTree, setDataForTree] = useState(null);

  useEffect(() => {SetCookie('deleted', deletedPosts)}, [deletedPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsDataLoaded(true);
    setTimeout(async () => {
      const response = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json');
      const newData = response.data.map((post) => ({ ...post, image: post.image.split('/')[1] }));
      const cookie = GetCookie('deleted') ? JSON.parse(GetCookie('deleted')) : null;
      setPosts(cookie ? newData.filter(item => !cookie.includes(item)) : newData);
      setDataForTree(convertTree(newData));
      setIsDataLoaded(false);
    }, 1000);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);

  const handleToggleView = () => setCardsView(cardsView => !cardsView);

  const handleToggleSortSize = () => setPosts([...posts].sort((prev, next) => prev.filesize - next.filesize));
  const handleToggleSortDate = () => setPosts([...posts].sort((prev, next) => prev.timestamp - next.timestamp));
  const handleToggleSortCategory = () => setPosts([...posts].sort((x, y) => x.category.localeCompare(y.category)));
  const handleToggleSortFileName = () => setPosts([...posts].sort((x, y) => x.image.localeCompare(y.image)));

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemsIndex = lastItemIndex - itemsPerPage;

  const currentItems = [...posts].slice(firstItemsIndex, lastItemIndex);

  const removePost = post => {
    setDeletedPosts(deletedPosts.concat([post]));
    setPosts(posts.filter(p => p.timestamp !== post.timestamp));
  };

  return (
    <div className="App">
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <Button
            variant="secondary"
            onClick={() => {
              RemoveCookie('deleted');
              fetchPosts();
            }}
          >
              Get items from bd
          </Button>
          <Form.Check 
            type="switch"
            id="cardsView"
            label="Switch Cards or Tree View"
            onChange={handleToggleView}
          />
          <Form.Check
            inline
            type="radio"
            name="group1"
            disabled={!cardsView}
            id="inline-radio-1"
            label="Switch sort file size"
            onChange={handleToggleSortSize}
          />
          <Form.Check 
            type="radio"
            name="group1"
            disabled={!cardsView}
            id="inline-radio-2"
            label="Switch sort date"
            onChange={handleToggleSortDate}
          />
          <Form.Check 
            type="radio"
            name="group1"
            disabled={!cardsView}
            id="inline-radio-3"
            label="Switch sort cathegory"
            onChange={handleToggleSortCategory}
          />
          <Form.Check 
            type="radio"
            name="group1"
            disabled={!cardsView}
            id="inline-radio-4"
            label="Switch sort file Name"
            onChange={handleToggleSortFileName}
          />
        </div>
      </nav>
     
      <section className="main-content">
        <div className="container">
          {isDataLoaded 
            ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
            ) : (
              <>
                {cardsView
                  ? (
                      <div className="row">
                        <ListCards cardsData={currentItems} remove={removePost} />
                        <Pagination 
                          totalCount={posts.length}
                          itemsPerPage={itemsPerPage}
                          setCurrentPage={setCurrentPage}
                          currentPage={currentPage}
                        />     
                      </div> 
                  ) : (
                    <div className='col'>
                      <TreeView data={dataForTree} />
                    </div>
                  )
                }
              </>
            )
          }          
        </div>
      </section>

      <nav className="navbar fixed-bottom navbar-light bg-light">
        <div className="container-fluid">
          <h5>fixed footer</h5>
        </div>
      </nav>
    </div>
  );
};

export default App;
