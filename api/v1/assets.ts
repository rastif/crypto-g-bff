import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";
import normalizeAssets from "../../src/utils/normalizeAssets";

axios.defaults.baseURL = config.API_BASE;
axios.defaults.headers.common["X-CoinAPI-Key"] = config.API_KEY;

const assets = async (req: VercelRequest, res: VercelResponse) => {
  const resp = await axios.get("/v1/assets");
  const normalizedAssets = normalizeAssets(resp.data);
  res.status(200).json(normalizedAssets);
};

export default allowCors(assets);
