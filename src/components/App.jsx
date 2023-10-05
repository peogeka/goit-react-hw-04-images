import { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from 'components/search-api/search-api';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COUNT_IN_PAGE = 12;

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const myApp = useRef(null);

  const [searchString, setSearchString] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const handleSetSearchString = searchString => {
    setSearchString(searchString);
    setItems([]);
    // setError(null);
    setPage(1);
    setTotalCount(0);
    setItem(null);
    setStatus(Status.IDLE);
  };

  const handleCloseModal = () => {
    setItem(null);
  };

  const handleIncreasePage = () => {
    setPage(page => page + 1);
  };

  const handleSetItem = item => {
    setItem(item);
  };

  useEffect(() => {
    if (!searchString) return;
    setStatus(Status.PENDING);
    getImages(searchString, page, COUNT_IN_PAGE)
      .then(resp => {
        if (resp.data.totalHits === 0) return Promise.reject(new Error('No data for this search'));

        setItems(items => [...items, ...resp.data.hits]);
        setTotalCount(resp.data.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        toast.error(error.message);
        setStatus(Status.IDLE);
      });

    window.scrollTo(0, myApp.current.scrollHeight);
  }, [searchString, page]);

  return (
    <div
      ref={myApp}
      style={{
        padding: '0 0 32px',
      }}
    >
      <Searchbar onSearch={handleSetSearchString} />

      <ImageGallery items={items} onClick={handleSetItem} />

      {status === Status.RESOLVED && totalCount > COUNT_IN_PAGE && page * COUNT_IN_PAGE < totalCount && (
        <Button onClick={handleIncreasePage} />
      )}

      {status === Status.PENDING && <Loader />}

      {item && status === Status.RESOLVED && <Modal onClose={handleCloseModal} item={item} />}

      <ToastContainer />
    </div>
  );
}
