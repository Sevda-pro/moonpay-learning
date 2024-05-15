// server.js
import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import { MoonPay } from '@moonpay/moonpay-node';
import sdk from '@api/moonpaydocs';
const app = express();
const port = process.env.PORT || 5000;
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(cors());

const moonPay = new MoonPay(process.env.API_KEY);
app.get('/sign-url', (req, res) => {

  const params = {
    apiKey: process.env.PUB_KEY,
    currencyCode: 'matic',
    baseCurrencyCode:'usd',
    showWalletAddressForm:true,
    walletAddress:process.env.wallet,
    quoteCurrencyAmount:'true',
    theme:'light'
  };
  const url = moonPay.url.generate({ flow: 'buy', params });
  console.log(url)
  const isSignatureValid = moonPay.url.isSignatureValid(
    url
  );
  console.log(isSignatureValid)
  res.redirect(url);
});
app.post('/state',async(req,res)=>{
  // console.log(req.query,52)

  // sdk.auth(process.env.PUB_KEY);
  // sdk.getBuyTransaction({transactionId:req.query.transactionId})
  //   .then(({ data }) => console.log(data))
  //   .catch(err => console.error(err));
    const data = req.body;  
    console.log(`Received data: ${JSON.stringify(data)}`);
    res.status(200).json({ status: 'success' });
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
