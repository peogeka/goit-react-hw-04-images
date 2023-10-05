import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalForm, Image, Close } from './Modal.styled';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, item }) {
  const keydownListener = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const clickBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keydownListener);
    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [keydownListener]);

  return createPortal(
    <Overlay className="overlay" onClick={clickBackDrop}>
      <Close type="button" onClick={onClose}>
        <IconContext.Provider value={{ size: 32 }}>
          <AiFillCloseCircle />
        </IconContext.Provider>
      </Close>
      <ModalForm className="modal">
        <Image src={item.largeImageURL} alt={item.tags} />
      </ModalForm>
    </Overlay>,
    modalRoot
  );
}
