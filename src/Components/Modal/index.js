import Modal from 'react-modal';
import styles from "./Modal.module.scss";

Modal.setAppElement('#root');

function F2LModal({ modalIsOpen, children }) {
  return (
    <Modal
        isOpen={modalIsOpen}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        {children}
    </Modal>
  );
}

export default F2LModal;
