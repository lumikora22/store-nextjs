import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
import FormPayment from "./FormPayment/FormPayment";
import { loadStripe } from "@stripe/stripe-js";

const stripePrimise = loadStripe(STRIPE_TOKEN);

export default function Payment({ products, address }) {
  console.log(stripePrimise);
  return (
    <div className="payment">
      <div className="title">Pago </div>
      <div className="data">
        <Elements stripe={stripePrimise} >
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
