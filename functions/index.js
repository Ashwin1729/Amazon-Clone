const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MNqeCSHaCvRvJ1rLIaTcuYnuUQfb8JZ21LusrYWEl84H1XE4VvV133ilvA8p5TP7JBWzePs5mWpzHXE6Tw9XXuy00JGZ9HMuZ"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total.toString();

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
    description: "First stripe payment implementation",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-e03a3/us-central1/api
