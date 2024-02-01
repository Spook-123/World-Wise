import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useDeleteCity } from "../pages/useDeleteCity";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// Global State -> query string
// Local State -> params
function CityItem({ city }) {
  const { deleteCity } = useDeleteCity();
  const { cityName, countryCode, date, id, lat, lng } = city;
  // console.log("City -> ", city);

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link className={`${styles.cityItem}`} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{countryCode}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
