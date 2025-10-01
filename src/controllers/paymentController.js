import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const payment = async (req, res) => {
  try {
    const { token, amount, bookingId, postalCode, name } = req.body;
    const email = req.user.email;

    // 1️⃣ Create PaymentIntent with billing details
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: token,
      confirmation_method: "manual",
      confirm: true,
      receipt_email: email,
      description: `Payment for booking ${bookingId}`,
      payment_method_data: {
        billing_details: {
          name,
          address: {
            postal_code: postalCode,
          },
        },
      },
    });

    res.json({ success: true, paymentIntent });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
