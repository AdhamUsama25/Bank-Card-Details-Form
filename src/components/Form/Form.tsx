import React, { useEffect, useState } from "react";
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

const handleNumberFormat = (value: string) => ({
  nonSpacedNumber: value.split(" ").join(""),
  spacedNumber: value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim(),
});

const Form = ({ setCardDetails, done, setDone }: FormProps) => {
  const [errors, setErrors] = useState<FormErrors>({
    cardHolder: "",
    cardNumber: "",
    cardExpiry: "",
    CVC: "",
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  const cardHolderInputRef = React.useRef<HTMLInputElement>(null);
  const cardNumberInputRef = React.useRef<HTMLInputElement>(null);
  const cardExpMonthInputRef = React.useRef<HTMLInputElement>(null);
  const cardExpYearInputRef = React.useRef<HTMLInputElement>(null);
  const CVCInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!done) {
      cardHolderInputRef.current?.focus();
      setCardDetails(defaultCardDetails);
    }
  }, [done, setCardDetails]);

  useEffect(() => {
    const copyNonSpacedNumber = (e: ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData?.setData(
        "text/plain",
        handleNumberFormat(cardNumberInputRef.current?.value ?? "")
          .nonSpacedNumber
      );
    };
    cardNumberInputRef.current?.addEventListener("copy", copyNonSpacedNumber);

    return () => {
      cardNumberInputRef.current?.removeEventListener(
        "copy",
        copyNonSpacedNumber
      );
    };
  }, []);

  const handleSubmitErrors = () => {
    const { nonSpacedNumber } = handleNumberFormat(
      cardNumberInputRef.current?.value || ""
    );

    setErrors((prev) => ({
      ...prev,

      cardHolder:
        cardHolderInputRef?.current?.value.length &&
        !cardHolderInputRef.current?.value.match(englishRegex)
          ? "Only English letters and spaces are allowed"
          : "",

      cardNumber: !nonSpacedNumber
        ? "Can't be blank"
        : nonSpacedNumber.length !== 16
        ? "Card number must be 16 digits"
        : "",

      cardExpiry: !cardExpMonthInputRef.current?.value
        ? "Can't be blank"
        : !cardExpMonthInputRef.current?.value.match(monthRegex)
        ? "Invalid month"
        : !cardExpYearInputRef.current?.value
        ? "Can't be blank"
        : "",

      CVC: !CVCInputRef.current?.value
        ? "Can't be blank"
        : CVCInputRef.current?.value.length !== 3
        ? "CVC must be 3 digits"
        : !CVCInputRef.current?.value.match(numbersOnlyRegex)
        ? "Wrong format, numbers only"
        : "",
    }));

    return (
      cardExpMonthInputRef.current?.value.match(monthRegex) &&
      nonSpacedNumber.length === 16 &&
      CVCInputRef.current?.value.length === 3 &&
      !errors.cardHolder &&
      !errors.cardNumber &&
      !errors.cardExpiry &&
      !errors.CVC
    );
  };

  const resetForm = () => {
    formRef.current?.reset();
    setErrors({
      cardHolder: "",
      cardNumber: "",
      cardExpiry: "",
      CVC: "",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolderInputRef.current?.value) {
      setCardDetails((prev) => ({
        ...prev,
        cardHolder: "",
      }));
    }
    if (handleSubmitErrors()) {
      setDone(true);
      resetForm();
    }
  };

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
    const { spacedNumber, nonSpacedNumber } = handleNumberFormat(
      e.target.value
    );

    console.log(nonSpacedNumber);
    cardNumberInputRef.current!.value = spacedNumber;

    setErrors((prev) => ({
      ...prev,
      cardNumber:
        nonSpacedNumber.match(numbersOnlyRegex) || !nonSpacedNumber
          ? ""
          : "Wrong format, numbers only",
    }));

    setCardDetails((prev) => ({
      ...prev,
      cardNumber: nonSpacedNumber.padEnd(16, "0"),
    }));

    if (
      nonSpacedNumber.length === 16 &&
      nonSpacedNumber.match(numbersOnlyRegex)
    )
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

    if (!e.target.value.match(monthRegex)) {
      setErrors((prev) => ({
        ...prev,
        cardExpiry: "Invalid month",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        cardExpiry: "",
      }));
    }

    if (e.target.value.length === 2 && e.target.value.match(monthRegex)) {
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
    setErrors((prev) => ({
      ...prev,
      CVC:
        e.target.value.match(numbersOnlyRegex) || !e.target.value
          ? ""
          : "Only numbers are allowed",
    }));

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
      ref={formRef}
      onSubmit={handleFormSubmit}
      className={[classes.Form, done ? "Out" : "Enter"].join(" ")}
    >
      <div>
        <label htmlFor="holder">CardHolder name</label>
        <input
          ref={cardHolderInputRef}
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
          className={errors.cardNumber ? classes.Error : ""}
          ref={cardNumberInputRef}
          maxLength={19}
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
              className={errors.cardExpiry ? classes.Error : ""}
              ref={cardExpMonthInputRef}
              onChange={onExpMonthChange}
              maxLength={2}
              type="text"
              placeholder="MM"
              id="exp_month"
            />
            <input
              className={errors.cardExpiry ? classes.Error : ""}
              ref={cardExpYearInputRef}
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
            className={errors.CVC ? classes.Error : ""}
            ref={CVCInputRef}
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
