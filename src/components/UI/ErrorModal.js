import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";

import styles from "./ErrorModal.module.css";

const Backdrop = (props) => (
  <div className={styles.backdrop} onClick={props.onConfirm} />
);
const Modal = (props) => (
  <>
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>Close</Button>
      </footer>
    </Card>
    ;{" "}
  </>
);

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ErrorModal;
