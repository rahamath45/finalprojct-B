import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const payment = async (req, res) => {
  try {
    const { token, amount, bookingId, postalCode, name } = req.body;
    const email = req.user.email;

       const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency: "usd",
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: "any", // allows 3D Secure redirect if required
  },
  confirm: true,
  receipt_email: email,
  description: `Payment for booking ${bookingId}`,
  payment_method: token,
  return_url: "https://yourdomain.com/bookings/success", // redirect after 3D Secure
});


    res.json({ success: true, paymentIntent });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
