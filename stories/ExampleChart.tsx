import * as React from 'react';
import { useVega } from '../';
import { useEffect } from 'react';
import { TopLevelSpec } from 'vega-lite/src/spec';
import defaultSpec from '../samples/vegaLiteSampleSpec';

interface ExampleChartProps {
  spec: TopLevelSpec;
}
const ExampleChart = ({ spec }: ExampleChartProps) => {
  const { ref, updateView } = useVega(spec);
  useEffect(() => {
    updateView(spec);
  }, [spec, updateView]);
  return <div ref={ref} />;
};

const what = () => {
  return <ExampleChart spec={defaultSpec} />;
};

export default ExampleChart;
