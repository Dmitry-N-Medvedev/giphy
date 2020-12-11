import {
  config,
} from 'dotenv';

config();

export async function get(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    key: process.env.GIPHY_API_KEY,
  }));
}
