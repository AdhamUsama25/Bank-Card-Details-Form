export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  cardExpiry: {
    month: string;
    year: string;
  };
  CVC: string;
}

export interface FormErrors {
  cardHolder: string,
  cardNumber: string,
  cardExpiry: string,
  CVC: string,
}
export type FrontCardDetails = Omit<CardDetails, "CVC">;
export type BackCardDetails = Pick<CardDetails, "CVC">;
