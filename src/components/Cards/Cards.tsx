import classes from "./Cards.module.scss";
import { BackCardDetails, CardDetails, FrontCardDetails } from "../../types";
import BackCard from "./BackCard/BackCard";
import FrontCard from "./FrontCard/FrontCard";

interface CardsProps {
  cardDetails: CardDetails;
}

const Cards = ({ cardDetails }: CardsProps) => {
  return (
    <div className={classes.Cards}>
      <FrontCard frontCardDetails={cardDetails as FrontCardDetails} />
      <BackCard backCardDetails={{CVC:cardDetails.CVC} as BackCardDetails}/>
    </div>
  );
};

export default Cards;
