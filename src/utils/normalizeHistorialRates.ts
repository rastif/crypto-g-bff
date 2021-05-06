const normalizeHistorialRates = (data: any[]) =>
  data.map(
    ([time, price_low, price_high, price_open, price_close]: number[]) => ({
      time,
      price_low,
      price_high,
      price_open,
      price_close,
    })
  );

export default normalizeHistorialRates;
