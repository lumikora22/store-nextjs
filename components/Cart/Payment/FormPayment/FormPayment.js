import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import Button from "@mui/material/Button";
import { CardElement, PaymentElement } from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883"
        },
        "::placeholder": {
          color: "#87bbfd"
        }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

export default function FormPayment({ products, address }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("realizando pago");
  };
  return (
    <form onSubmit={handleSubmit} className="form-payment">
      <PaymentElement />
      <CardElement />
      {/* <Button type="submit">Pagar</Button> */}
    </form>
  );
}
