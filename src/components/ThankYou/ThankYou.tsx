import CustomButton from "../UI/CustomButton/CustomButton";
import checkIcon from "../../assets/images/icon-complete.svg";
import classes from "./ThankYou.module.scss";

interface ThankYouProps {
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThankYou = ({ done, setDone }: ThankYouProps) => {
  return (
    <div className={[classes.ThankYou, done ? "Enter" : "Out"].join(" ")}>
      <img src={checkIcon} alt="Thank you" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <CustomButton text="Continue" onClick={() => setDone(false)} />
    </div>
  );
};

export default ThankYou;
