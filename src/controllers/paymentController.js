import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
export const payment = async (req, res) => {
  try {
    const { token, amount, bookingId } = req.body;
    const email = req.user.email;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: token,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({ success: true, paymentIntent });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
