import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useGetCity } from "../pages/useGetCity";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  // const { getCity, currentCity, isLoading } = useCities();
  // const { currentCity } = useCities();
  const { getCityData: getCity, isCityLoading: isLoading } = useGetCity(id);

  if (!getCity) return <Spinner />;
  // console.log("getCity -> ", getCity);

  const { cityName, countryCode, date, notes } = getCity[0];

  // if (!isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{countryCode}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
