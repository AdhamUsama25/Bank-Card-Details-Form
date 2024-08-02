import React, { useState } from "react";
import classes from "./Form.module.scss";
import { CardDetails, FormErrors } from "../../types";
import { defaultCardDetails } from "../../data";
import CustomButton from "../UI/CustomButton/CustomButton";

interface FormProps {
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}
const numbersOnlyRegex = /^\d+$/;
const englishRegex = /^[a-zA-Z ]+$/;
const monthRegex = /^(0?[1-9]|1[0-2])$/;

const Form = ({ setCardDetails, done, setDone }: FormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const [errors, setErrors] = useState<FormErrors>({
    cardHolder: "",
    cardNumber: "",
    cardExpiry: "",
    CVC: "",
  });

  const onHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({
      ...prev,
      cardHolder:
        e.target.value.match(englishRegex) || !e.target.value
          ? ""
          : "Only English letters and spaces are allowed",
    }));

    setCardDetails((prev) => ({
      ...prev,
      cardHolder: e.target.value,
    }));
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setErrors(prev=>({
      ...prev,
      cardNumber: e.target.value.match(numbersOnlyRegex) || !e.target.value
      ? ""
      : "Only numbers are allowed",
    }))

    setCardDetails((prev) => ({
      ...prev,
      cardNumber: e.target.value.padEnd(16, "0"),
    }));

    if (e.target.value.length === 16)
      document.getElementById("exp_month")?.focus();
  };

  const onExpMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails((prev) => ({
      ...prev,
      cardExpiry: {
        month: e.target.value.padStart(2, "0"),
        year: prev.cardExpiry.year,
      },
    }));

    if (e.target.value.length === 2) {
      document.getElementById("exp_year")?.focus();
    }
  };
  const onExpYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails((prev) => ({
      ...prev,
      cardExpiry: {
        year: e.target.value.padStart(2, "0"),
        month: prev.cardExpiry.month,
      },
    }));

    if (e.target.value.length === 2) {
      document.getElementById("CVC")?.focus();
    }
  };

  const OnCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setCardDetails((prev) => ({
        ...prev,
        CVC: defaultCardDetails.CVC,
      }));
    }

    if (e.target.value.match(numbersOnlyRegex))
      setCardDetails((prev) => ({
        ...prev,
        CVC: e.target.value.padEnd(3, "0"),
      }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={[classes.Form, done ? "Out" : "Enter"].join(" ")}
    >
      <div>
        <label htmlFor="holder">CardHolder name</label>
        <input
          className={errors.cardHolder ? classes.Error : ""}
          maxLength={20}
          onChange={onHolderChange}
          type="text"
          id="holder"
          placeholder="eg. Jane Appleseed"
        />
        {errors.cardHolder && (
          <p className={classes.Error}>{errors.cardHolder}</p>
        )}
      </div>

      <div>
        <label htmlFor="number">Card Number</label>
        <input
          required
          maxLength={16}
          onChange={onNumberChange}
          type="text"
          id="number"
          placeholder="eg. 1234 5678 9123 0000"
        />
        {errors.cardNumber && (
          <p className={classes.Error}>{errors.cardNumber}</p>
        )}
      </div>

      <div className={classes.ExpCVC}>
        <div className={classes.Exp}>
          <label>Exp.Date (MM/YY)</label>
          <div className={classes.ExpiryInputs}>
            <input
              required
              onChange={onExpMonthChange}
              maxLength={2}
              type="text"
              placeholder="MM"
              id="exp_month"
            />
            <input
              required
              onChange={onExpYearChange}
              maxLength={2}
              type="text"
              placeholder="YY"
              id="exp_year"
            />
          </div>
          {errors.cardExpiry && (
            <p className={classes.Error}>{errors.cardExpiry}</p>
          )}
        </div>

        <div className={classes.CVC}>
          <label htmlFor="CVC">CVC</label>
          <input
            required
            maxLength={3}
            onChange={OnCvcChange}
            type="text"
            placeholder="eg. 123"
            id="CVC"
          />
          {errors.CVC && <p className={classes.Error}>{errors.CVC}</p>}
        </div>
      </div>

      <CustomButton text="Confirm" type="submit" onClick={() => {}} />
    </form>
  );
};

export default Form;
