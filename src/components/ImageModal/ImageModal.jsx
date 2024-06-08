import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

function ImageModal({ closeModal, modalIsOpen, photo }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={400}
      className={css.modal}
    >
      <img src={photo.urls.regular} alt={photo.alt_description} />
      <div className={css.modalInfo}>
        <p className={css.modalText}>{photo.alt_description}</p>
        <p className={css.modalText}>Author: {photo.user.name}</p>
      </div>
    </Modal>
  );
}

export default ImageModal;
