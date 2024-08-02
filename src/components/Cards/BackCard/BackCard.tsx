import classes from "./BackCard.module.scss";
import { BackCardDetails } from "../../../types";

interface BackCardProps {
  backCardDetails: BackCardDetails;
}

const BackCard = ({ backCardDetails }: BackCardProps) => {
  return (
    <div className={classes.BackCard}>
      <p>{backCardDetails.CVC}</p>
    </div>
  );
};
export default BackCard;
