import { useState } from "react";
import classes from "./App.module.scss";
import Cards from "./components/Cards/Cards";
import { CardDetails } from "./types";
import Form from "./components/Form/Form";
import { defaultCardDetails } from "./data";
import ThankYou from "./components/ThankYou/ThankYou";

function App() {
  const [cardDetails, setCardDetails] =
    useState<CardDetails>(defaultCardDetails);
  const [done, setDone] = useState(false);

  return (
    <div className={classes.App}>
      <div className={classes.Side}></div>
      <main>
        <Cards cardDetails={cardDetails} />
        <div className={classes.Content}>
          <Form done={done} setDone={setDone} setCardDetails={setCardDetails} />
          <ThankYou done={done} setDone={setDone} />
        </div>
      </main>
    </div>
  );
}

export default App;
