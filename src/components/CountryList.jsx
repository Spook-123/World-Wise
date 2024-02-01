import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useMap } from "../pages/useMap";
import { useUser } from "../pages/useUser";

function CountryList() {
  // const { cities, isLoading } = useCities();
  const { user } = useUser();
  const { mapData: cities, isLoading } = useMap(user.id);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // Normal Javascript -> filter out countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.countryName).includes(city.countryName))
      return [
        ...arr,
        { countryName: city.countryName, countryCode: city.countryCode },
      ];
    else return arr;
  }, []);

  // console.log("Countries -> ", countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.countryCode} />
      ))}
    </ul>
  );
}

export default CountryList;
