document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-button");

    buyButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const product = event.target.closest(".product");
            const productId = product.getAttribute("data-id");
            const productPrice = product.getAttribute("data-price");

            const response = await fetch("http://localhost:3000/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId, productPrice }),
            });

            const session = await response.json();

            // Redirect to Stripe Checkout
            if (session.url) {
                window.location.href = session.url;
            } else {
                alert("Failed to create payment session.");
            }
        });
    });
});
