import React from "react";
import classes from "./CustomButton.module.scss";

interface CustomButtonProps {
  text?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  autoFocus?: boolean;
}

const CustomButton = ({
  text,
  onClick,
  type,
}: CustomButtonProps) => {
  return (
    <button
      autoFocus={true}
      className={classes.Button}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
export default CustomButton;
