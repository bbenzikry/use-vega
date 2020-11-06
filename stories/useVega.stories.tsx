import React from 'react'
import defaultSpec from '../samples/vegaLiteSampleSpec'
import vegaSpec from '../samples/vegaSampleSpec'
import ExampleChart from './ExampleChart'
import { withKnobs, object, knob } from '@storybook/addon-knobs'
import { useVega } from '../src/useVega'
export default {
  title: 'use-vega',
  // If we do not disable it, filters / transforms on the vega spec have html entities.
  decorators: [withKnobs({ escapeHTML: false })]
}

export const UseVegaStory = () => {
  const value = object('spec', { ...defaultSpec })
  return <ExampleChart spec={value} />
}

export const UseVegaTooltipStory = () => {
  const value = object('spec', {
    ...defaultSpec,
    mark: { type: 'line', tooltip: true, point: true }
  })
  return <ExampleChart spec={value} />
}

export const WithLoadingStory = () => {
  const value = object('spec', { ...defaultSpec })
  const { noData, isLoading, ref } = useVega(value)
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {noData && <div>no data..</div>}
    </div>
  )
}

export const NoDataStory = () => {
  const value = object('spec', { ...defaultSpec, data: [] })
  const { noData, isLoading, ref } = useVega(value)
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
    </div>
  )
}

export const InvalidSpecStory = () => {
  const value = object('spec', {})
  //@ts-ignore
  const { noData, isLoading, ref, isError } = useVega(value)
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {isError && <div>Encountered an error while rendering spec</div>}
    </div>
  )
}

export const WithVegaNonLite = () => {
  const value = object('spec', vegaSpec)
  //@ts-ignore
  const { noData, isLoading, ref, isError } = useVega(value)
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {isError && <div>Encountered an error while rendering spec</div>}
    </div>
  )
}

WithVegaNonLite.story = {
  name: 'Vega: pie'
}

UseVegaStory.story = {
  name: 'Vega lite: Simple area chart'
}

UseVegaTooltipStory.story = {
  name: 'Vega lite: Line with point tooltips'
}

WithLoadingStory.story = {
  name: 'With loading component'
}

NoDataStory.story = {
  name: 'With no data provided'
}

InvalidSpecStory.story = {
  name: 'Malformed spec'
}
