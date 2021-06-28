import styles from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = (
    <ul className={styles.cartItems}>
      {[{ id: "c1", name: "sushi", amount: "2", price: "12.99" }].map(
        (item) => (
          <li>{item.name}</li>
        )
      )}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.72</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.buttonAlt}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
