const paypal = require('@paypal/checkout-server-sdk');

// PayPal client setup
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Create PayPal order
async function createPaypalOrder(amount) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount,
        },
      },
    ],
  });

  const response = await client.execute(request);
  return response.result;
}

// Capture PayPal payment
async function capturePaypalPayment(orderId, payerId) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client.execute(request);
  return response.result;
}

module.exports = { createPaypalOrder, capturePaypalPayment };
