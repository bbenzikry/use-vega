import React, { useCallback, useEffect, useState } from 'react'
import defaultSpec from '../samples/vegaLiteSampleSpec'
import vegaSpec from '../samples/vegaSampleSpec'
import ExampleChart from './ExampleChart'
import { withKnobs, object } from '@storybook/addon-knobs'
import { useVega } from '../src/useVega'
import vegaDataSample from '../samples/vegaDataSample'
import { GrammerType } from '../src/enums/GrammerType'
import { TopLevelSpec } from 'vega-lite'
import { Spec } from 'vega'
import vegaHoverSpec from '../samples/vegaHoverSpec'
export default {
  title: 'use-vega',
  // If we do not disable it, filters / transforms on the vega spec have html entities.
  decorators: [withKnobs({ escapeHTML: false })],
}

export const UseVegaStory = () => {
  const value = object('spec', { ...defaultSpec })
  return <ExampleChart spec={value} />
}

export const UseVegaTooltipStory = () => {
  const value = object('spec', {
    ...defaultSpec,
    mark: { type: 'line', tooltip: true, point: true },
  } as TopLevelSpec)
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
  const value = object('spec', { ...defaultSpec, mark: undefined })
  //@ts-ignore
  const { noData, isLoading, ref, error } = useVega(value)
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {error && <div>Encountered an error while rendering spec</div>}
    </div>
  )
}

const getSomeData = async () => {
  await new Promise((_) => setTimeout(_, 2000))
  return vegaDataSample
}

// @ts-ignore
const PropChangeComponent = ({ spec, grammer }) => {
  const { noData, isLoading, ref, error, updateView } = useVega(spec, {
    grammer,
  })
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {error && <div>Encountered an error while rendering spec</div>}
      {error && <div>{error}</div>}
    </div>
  )
}

export const PropChange = () => {
  const [exampleState, setExample] = useState<{
    spec: Spec | TopLevelSpec
    grammer: GrammerType
  }>({
    spec: defaultSpec,
    grammer: GrammerType.VEGA_LITE,
  })

  const onClick = useCallback(() => {
    setExample({ spec: vegaSpec, grammer: GrammerType.VEGA })
  }, [])

  return (
    <div>
      <button onClick={onClick}>Change props</button>
      <PropChangeComponent
        spec={exampleState.spec}
        grammer={exampleState.grammer}
      />
    </div>
  )
}

export const FetchStory = () => {
  const value = object('spec', { ...defaultSpec, data: [] })
  const { noData, isLoading, ref, error, updateView } = useVega(value)
  useEffect(() => {
    ;(async () => {
      const someData = await getSomeData()
      updateView({ ...defaultSpec, data: { values: someData } })
    })()
  })
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {error && <div>Encountered an error while rendering spec</div>}
      {error && <div>{error}</div>}
    </div>
  )
}

export const WithVegaNonLite = () => {
  const value = object('spec', vegaSpec)
  const { noData, isLoading, ref, error } = useVega(value, {
    grammer: GrammerType.VEGA,
  })
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {error && <div>Encountered an error while rendering spec</div>}
    </div>
  )
}

export const WithSignalHandlers = () => {
  const value = object('spec', vegaHoverSpec)
  const { noData, isLoading, ref, error } = useVega(
    // @ts-ignore
    value,
    {
      grammer: GrammerType.VEGA,
    },
    {
      tooltip: () => {
        console.log('tooltip hover')
      },
    }
  )
  return (
    <div>
      <div ref={ref} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && noData && <div>No data found</div>}
      {error && <div>Encountered an error while rendering spec</div>}
    </div>
  )
}

WithVegaNonLite.storyName = 'Vega: pie'
UseVegaStory.storyName = 'Vega lite: Simple area chart'
UseVegaTooltipStory.storyName = 'Vega lite: Line with point tooltips'
WithLoadingStory.storyName = 'With loading component'
NoDataStory.storyName = 'With no data provided'
InvalidSpecStory.storyName = 'Malformed spec'
FetchStory.storyName = 'Fetch example'
PropChange.storyName = 'Change spec with props'
WithSignalHandlers.storyName = 'With signal handlers'
