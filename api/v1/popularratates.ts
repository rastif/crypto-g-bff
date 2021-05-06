import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";

axios.defaults.baseURL = config.API_BASE;

const POPULAR_ASSET_IDS: string[] = ["BTC", "ETH", "MKR"];

const popularratates = async (req: VercelRequest, res: VercelResponse) => {
  const reqArr = POPULAR_ASSET_IDS.map((assetId) =>
    axios.get(`/products/${assetId}-USD/stats`)
  );
  const respArr = await axios.all(reqArr);
  const respRes = respArr.map((a) => a.data);

  const normalizedData = POPULAR_ASSET_IDS.map((assetId, i) => ({
    asset_id_base: assetId,
    rate: respRes[i].last,
  }));

  res.status(200).json(normalizedData);
};

export default allowCors(popularratates);
