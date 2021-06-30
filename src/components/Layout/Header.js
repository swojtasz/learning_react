import styles from "./Header.module.css";

import mealsIMG from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React meals</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={styles.mainImage}>
        <img src={mealsIMG} alt="Meals" />
      </div>
    </>
  );
};

export default Header;
