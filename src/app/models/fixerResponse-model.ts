export class FixerResponse {
  success: boolean;
  historical: boolean;
  timeseries: boolean;
  fluctuation: boolean;
  symbols: object;
  timestamp: number;
  base: string;
  date: Date;
  rates: object;
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
