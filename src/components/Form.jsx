// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
// Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateForm } from "../pages/useCreateForm";
import { useUser } from "../pages/useUser";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  // const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const { isCreating, createForm } = useCreateForm();
  const { user } = useUser();
  // console.log("User -> ", user.id);

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city Click somewhere else 😉"
            );
          setCityName(data.city || data.locality || "");
          setCountryName(data.countryName);
          setCountryCode(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      countryCode,
      date,
      notes,
      lat,
      lng,
      userId: user.id,
    };

    createForm(
      { ...newCity },
      {
        onSuccess: (data) => {
          // Created  data
          console.log(data);
          setIsLoadingGeocoding(false);
          setCityName("");
          setCountryName("");
          setDate(new Date());
          setNotes("");
          setCountryCode("");
          setGeocodingError("");
          navigate("/app/cities");
        },
      }
    );
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isCreating ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled={isCreating}
        />
        <span className={styles.flag}>{countryCode}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          disabled={isCreating}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          disabled={isCreating}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" disabled={isCreating}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
