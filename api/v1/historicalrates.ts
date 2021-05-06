import { VercelRequest, VercelResponse } from "@vercel/node";
import qs from "qs";
import axios from "axios";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import config from "../../src/config";
import allowCors from "../../src/middlewares/allowCors";
import normalizeHistorialRates from "../../src/utils/normalizeHistorialRates";

axios.defaults.baseURL = config.API_BASE;

const historicalrates = async (req: VercelRequest, res: VercelResponse) => {
  const { asset_id_base, granularity, time_start, time_end } = req.query;

  const daysDiff = differenceInDays(
    new Date(time_end as string),
    new Date(time_start as string)
  );

  // cannot retrive more than 300 datapoints, so if > 300, we split the fetching
  let result;
  if (daysDiff > 300) {
    const queryParams1 = qs.stringify(
      {
        granularity,
        start: time_start,
        end: addDays(new Date(time_start as string), 180).toISOString(),
      },
      { addQueryPrefix: true, skipNulls: true }
    );
    const queryParams2 = qs.stringify(
      {
        granularity,
        start: addDays(new Date(time_start as string), 181).toISOString(),
        end: time_end,
      },
      { addQueryPrefix: true, skipNulls: true }
    );
    const respArr = await axios.all([
      axios.get(`/products/${asset_id_base}/candles${queryParams2}`),
      axios.get(`/products/${asset_id_base}/candles${queryParams1}`),
    ]);
    result = respArr.map((a) => a.data).flat();
  } else {
    const queryParams = qs.stringify(
      {
        granularity,
        start: time_start,
        end: time_end,
      },
      { addQueryPrefix: true, skipNulls: true }
    );
    const resp = await axios.get(
      `/products/${asset_id_base}/candles${queryParams}`
    );
    result = resp.data;
  }

  const normalizedData = normalizeHistorialRates(result).reverse();

  res.status(200).json(normalizedData);
};

export default allowCors(historicalrates);
