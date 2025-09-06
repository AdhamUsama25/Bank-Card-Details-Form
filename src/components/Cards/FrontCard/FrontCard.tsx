import cardLogo from "../../../assets/images/card-logo.svg";
import { FrontCardDetails } from "../../../types";
import classes from "./FrontCard.module.scss";
interface FrontCardProps {
  frontCardDetails: FrontCardDetails;
}

const FrontCard = ({ frontCardDetails }: FrontCardProps) => {
  return (
    <div className={classes.FrontCard}>
      <div className={classes.Logo}>
        <img src={cardLogo} alt="" />
      </div>

      <div className={classes.Details}>
        <div className={classes.Number}>
          <p>{frontCardDetails.cardNumber.slice(0, 4)}</p>
          <p>{frontCardDetails.cardNumber.slice(4, 8)}</p>
          <p>{frontCardDetails.cardNumber.slice(8, 12)}</p>
          <p>{frontCardDetails.cardNumber.slice(12, 16)}</p>
        </div>
        <div className={classes.Bottom}>
          <p className={classes.Name}>
            {frontCardDetails.cardHolder.toUpperCase()}
          </p>
          <p>
            {frontCardDetails.cardExpiry.month}/
            {frontCardDetails.cardExpiry.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
