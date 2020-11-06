import { TopLevelSpec } from "vega-lite";

// From vega editor: https://vega.github.io/editor/#/examples/vega-lite/area_gradient
const spec: TopLevelSpec = {
  description: "Google's stock price over time.",
  data: {
    url: 'https://vega.github.io/editor/data/stocks.csv',
  },
  transform: [
    {
      filter: 'datum.symbol==="GOOG"',
    },
  ],
  mark: {
    type: 'area',
    line: {
      color: 'darkgreen',
    },
    color: {
      x1: 1,
      y1: 1,
      x2: 1,
      y2: 0,
      gradient: 'linear',
      stops: [
        {
          offset: 0,
          color: 'white',
        },
        {
          offset: 1,
          color: 'darkgreen',
        },
      ],
    },
  },
  encoding: {
    x: {
      field: 'date',
      type: 'temporal',
    },
    y: {
      field: 'price',
      type: 'quantitative',
    },
  },
};


export default spec
