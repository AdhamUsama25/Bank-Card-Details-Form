import classes from "./CustomButton.module.scss";

interface CustomButtonProps {
    text?: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
    }

const CustomButton = ({ text, onClick, type }: CustomButtonProps) => {
  return <button className={classes.Button} onClick={onClick} type={type}>{text}</button>;
};
export default CustomButton;