import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";

axios.defaults.baseURL = config.API_BASE;

const rate = async (req: VercelRequest, res: VercelResponse) => {
  const { asset_id_base } = req.query;
  const resp = await axios.get(`/products/${asset_id_base}-USD/stats`);
  res.status(200).json({ asset_id_base, rate: resp.data.last });
};

export default allowCors(rate);
