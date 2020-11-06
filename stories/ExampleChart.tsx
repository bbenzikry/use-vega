import * as React from 'react'
import { useVega } from '../'
import { useEffect } from 'react'
import { TopLevelSpec } from 'vega-lite/src/spec'
import { Spec } from 'vega'

interface ExampleChartProps {
  spec: TopLevelSpec | Spec
}
const ExampleChart = ({ spec }: ExampleChartProps) => {
  const { ref, updateView } = useVega(spec)
  useEffect(() => {
    updateView(spec)
  }, [spec, updateView])
  return <div ref={ref} />
}

export default ExampleChart
