import React, { useEffect, useReducer } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateForm } from "../pages/useCreateForm";
import { useUser } from "../pages/useUser";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const initialState = {
  isLoadingGeocoding: false,
  cityName: "",
  countryName: "",
  date: new Date(),
  notes: "",
  countryCode: "",
  geocodingError: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoadingGeocoding: action.payload };
    case "SET_CITY_DATA":
      return {
        ...state,
        cityName: action.payload.cityName,
        countryName: action.payload.countryName,
        countryCode: action.payload.countryCode,
      };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "SET_GEOCODING_ERROR":
      return { ...state, geocodingError: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const { isCreating, createForm } = useCreateForm();
  const { user } = useUser();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_GEOCODING_ERROR", payload: "" });

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        dispatch({
          type: "SET_CITY_DATA",
          payload: {
            cityName: data.city || data.locality || "",
            countryName: data.countryName,
            countryCode: data.countryCode,
          },
        });
      } catch (err) {
        dispatch({ type: "SET_GEOCODING_ERROR", payload: err.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.cityName || !state.date) return;

    const newCity = {
      cityName: state.cityName,
      countryName: state.countryName,
      countryCode: state.countryCode,
      date: state.date,
      notes: state.notes,
      lat,
      lng,
      userId: user.id,
    };

    createForm(
      { ...newCity },
      {
        onSuccess: (data) => {
          console.log(data);
          dispatch({ type: "RESET_STATE" });
          navigate("/app/cities");
        },
      }
    );
  };

  if (state.isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (state.geocodingError) return <Message message={state.geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isCreating ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "SET_CITY_DATA", payload: e.target.value })
          }
          value={state.cityName}
          disabled={isCreating}
        />
        <span className={styles.flag}>{state.countryCode}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {state.cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => dispatch({ type: "SET_DATE", payload: date })}
          selected={state.date}
          dateFormat="dd/MM/yyyy"
          disabled={isCreating}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "SET_NOTES", payload: e.target.value })
          }
          value={state.notes}
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
