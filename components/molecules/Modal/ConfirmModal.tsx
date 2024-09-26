import React from 'react';
import Modal from  "react-modal"
import styles from "./style.module.css";

type ConfirmModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  title: string;
};

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, title }: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>{title}</h2>
      <div>
       <button onClick={onConfirm}>Yes</button>
       <button onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
