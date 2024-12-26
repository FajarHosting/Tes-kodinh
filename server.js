const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_yourSecretKey"); // Ganti dengan Stripe Secret Key Anda

const app = express();
app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
    const { productId, productPrice } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "idr",
                    product_data: {
                        name: `Product ID: ${productId}`,
                    },
                    unit_amount: parseInt(productPrice),
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ url: session.url });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
