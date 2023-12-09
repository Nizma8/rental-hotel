
const baseURL = {
    sandbox: 'https://api-m.sandbox.paypal.com', 
    
  };
  
// generate token
const generateAccessToken = async () => {
    try {
      const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.APP_SECRET}`).toString('base64');
      const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate access token: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error generating access token:', error.message);
      throw error;
    }
  };
// to create order
const createOrder = async (totalAmount) => {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;
  
    // Create Order
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalAmount.toString(),
            },
          },
        ],
      }),
    });
  
    const orderData = await response.json();
    return orderData.id;
  };
// to capture order
const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`;
  
    // Capture Order
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const captureData = await response.json();
    return captureData;
  };
 module.exports = {createOrder ,captureOrder}  