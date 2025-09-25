import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
export const payment = async(req,res)=>{
     try {
    const { token, amount, bookingId} = req.body;
       const email = req.user.email;
        const customer = await stripe.customers.create({
        email,
        source: token.id,
      });
     let  customerId = customer.id;
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      customer: customerId, 
      description: `Payment for booking ${bookingId}`,
      receipt_email: email,
    });

    res.json({ success: true, charge });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
    


