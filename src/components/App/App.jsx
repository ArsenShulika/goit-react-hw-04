import { useState, useEffect } from 'react';
import { getPhotos } from '../../photo-api.js';
import Loader from '../Loader/Loader';
import css from '../App/App.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchPhotos() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await getPhotos(searchQuery, page);
        setPhotos(prevState => [...prevState, ...results]);
        setShowBtn(total_pages && total_pages !== page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsError(false);
      }
    }
    fetchPhotos();
  }, [page, searchQuery]);

  const handleSearch = async topic => {
    setSearchQuery(topic);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal(topic) {
    setModalImage(topic);
  }

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery
          items={photos}
          openModal={openModal}
          onAfterOpen={afterOpenModal}
        />
      )}
      {isLoading && <Loader />}
      {showBtn && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          photo={modalImage}
        />
      )}
    </div>
  );
}
