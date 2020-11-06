import * as React from 'react'
import { useVega } from '../src/useVega'
import { TopLevelSpec } from 'vega-lite'
interface TestComponentProps {
  spec: TopLevelSpec
  // handleLoad?: boolean
}
export default ({ spec }: TestComponentProps) => {
  const { ref, noData, isLoading, error } = useVega(spec)
  return (
    <>
      <div ref={ref} />
      {noData && <>{'no data'}</>}
      {isLoading && <>{'loading'}</>}
      {error && <>{'error'}</>}
    </>
  )
}
