import { VercelRequest, VercelResponse } from "@vercel/node";
import qs from "qs";
import axios from "axios";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";

axios.defaults.baseURL = config.API_BASE;
axios.defaults.headers.common["X-CoinAPI-Key"] = config.API_KEY;

const historicalrates = async (req: VercelRequest, res: VercelResponse) => {
  const {
    asset_id_base,
    asset_id_quote,
    period_id,
    time_start,
    time_end,
  } = req.query;

  const queryParams = qs.stringify(
    {
      period_id,
      time_start,
      time_end,
    },
    { addQueryPrefix: true, skipNulls: true }
  );

  const resp = await axios.get(
    `/v1/ohlcv/${asset_id_base}/${asset_id_quote}/history${queryParams}`
  );

  res.status(200).json(resp.data);
};

export default allowCors(historicalrates);
