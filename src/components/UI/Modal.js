import styles from "./Modal.module.css";

import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portal = document.getElementById("overlays");

  return (
    <>
      {ReactDom.createPortal(<Backdrop />, portal)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </>
  );
};

export default Modal;
