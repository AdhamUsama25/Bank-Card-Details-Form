import React from "react";
import checkIcon from "../../assets/images/icon-complete.svg";
import CustomButton from "../UI/CustomButton/CustomButton";
import classes from "./ThankYou.module.scss";

interface ThankYouProps {
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThankYou = ({ done, setDone }: ThankYouProps) => {
  if (!done) return <></>
  return (
    <div className={[classes.ThankYou, done ? "Enter" : "Out"].join(" ")}>
      <img src={checkIcon} alt="Thank you" />
      <h1>Thank you!</h1>
      <p>We&apos;ve added your card details</p>
      <CustomButton text="Continue" onClick={() => setDone(false)} />
    </div>
  );
};

export default ThankYou;
