import { useState, useEffect } from 'react';
import { getPhotos } from '../../photo-api.js';
import Loader from '../Loader/Loader';
import css from '../App/App.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchPhotos() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getPhotos(searchQuery, page);
        setPhotos(prevState => [...prevState, ...data]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos();
  }, [page, searchQuery, totalPages]);

  const handleSearch = async topic => {
    setSearchQuery(topic);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  function openModal(imgUrl, alt) {
    setIsOpen(true);
    setModalImageSrc(imgUrl);
    setModalImageAlt(alt);
  }

  function closeModal() {
    setIsOpen(false);
    setModalImageSrc('');
    setModalImageAlt('');
  }

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery items={photos} onClick={openModal} />}
      <ImageModal photos={photos} />
      {photos.length > 0 && !isLoading && (
        <button
          className={css.btn}
          onClick={handleLoadMore}
          disabled={page === totalPages}
        >
          Load more..
        </button>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        modalImageUrl={modalImageSrc}
        modalImageAlt={modalImageAlt}
      />
    </div>
  );
}
