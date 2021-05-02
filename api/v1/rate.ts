import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";

axios.defaults.baseURL = config.API_BASE;
axios.defaults.headers.common["X-CoinAPI-Key"] = config.API_KEY;

const rate = async (req: VercelRequest, res: VercelResponse) => {
  const { asset_id_base, asset_id_quote } = req.query;
  const resp = await axios.get(
    `/v1/exchangerate/${asset_id_base}/${asset_id_quote}`
  );
  res.status(200).json(resp.data);
};

export default allowCors(rate);
