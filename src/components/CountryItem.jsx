import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.countryCode}</span>
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;
