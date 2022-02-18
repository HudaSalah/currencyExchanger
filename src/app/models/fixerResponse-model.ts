export class FixerResponse {
  success: boolean;
  historical: boolean;
  timeseries: boolean;
  fluctuation: boolean;
  symbols: object;
  timestamp: number;
  base: string;
  date: Date;
  rates: object = {
    "2012-05-01":{
      "USD": 1.322891,
      "AUD": 1.278047,
      "CAD": 1.302303
    },
    "2012-05-02": {
      "USD": 1.315066,
      "AUD": 1.274202,
      "CAD": 1.299083
    },
    "2012-05-03": {
      "USD": 1.314491,
      "AUD": 1.280135,
      "CAD": 1.296868
    }
};
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    rate: number;
  };
  result: number;

  start_date: Date;
  end_date: Date;
}
