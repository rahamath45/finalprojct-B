import Stripe from "stripe";
import Booking from "../models/Booking.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const payment = async (req, res) => {
  try {
    const { token, amount, classId, date, attemptId } = req.body;

    // Optional: check idempotency to avoid double booking
    const existing = await Booking.findOne({ attemptId });
    if(existing) return res.status(409).json({ success: false, message: "Booking already processed" });

    // 1️⃣ Process payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: token,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    // 2️⃣ Only if payment succeeds, create booking
    const booking = await Booking.create({
      user: req.user._id,
      class: classId,
      date,
      paymentId: paymentIntent.id,
      attemptId,
    });

    res.json({ success: true, booking, paymentIntent });

  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
