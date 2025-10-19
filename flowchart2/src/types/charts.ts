export type BaseDatum = Record<string, string | number | Date>;

export type SingleSeriesDatum = BaseDatum & {
  label: string;
  value: number;
};

export type LineSeriesPoint = {
  x: string | number | Date;
  y: number;
};

export type LineSeries = {
  name: string;
  points: LineSeriesPoint[];
};
