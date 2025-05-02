import { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

export const Modal = ({ children, onClose }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  // disable scrolling when sidebar is opened
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setIsOpened(true);
  }, []);

  const onModalClose = () => {
    setIsOpened(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className={clsx('modal', { 'modal--opened': isOpened })}>
      <div className="modal-inner">
        <div className="modal-content">
          <button type="button" className="modal-close" onClick={onModalClose}>
            X
          </button>
          {typeof children !== 'function' ? children : children({ onModalClose })}
        </div>
      </div>
    </div>
  );
};

type Props = {
  onClose: () => void;
  children: ReactNode | ((props: { onModalClose: () => void }) => ReactNode);
};
