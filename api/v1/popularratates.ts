import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";

axios.defaults.baseURL = config.API_BASE;
axios.defaults.headers.common["X-CoinAPI-Key"] = config.API_KEY;

const POPULAR_ASSET_IDS: string[] = ["BTC", "ETH", "XRP"];

const popularratates = async (req: VercelRequest, res: VercelResponse) => {
  const reqArr = POPULAR_ASSET_IDS.map((assetId) =>
    axios.get(`/v1/exchangerate/${assetId}/USD`)
  );
  const respArr = await axios.all(reqArr);
  const respRes = respArr.map((a) => a.data);
  res.status(200).json(respRes);
};

export default allowCors(popularratates);
