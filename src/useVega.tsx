import { useRef, useEffect, useCallback, useState } from 'react'
import { TopLevelSpec } from 'vega-lite'
import { View } from 'vega'
import { updateVegaView, ViewOptions } from './helpers/view'
import useRefState from './hooks/useRefState'
import warning from 'tiny-warning'
// import useForceUpdate from './hooks/useForceUpdate'

const isView = (view: View | null | undefined): view is View => {
  return !!view && !!view?.addDataListener
}
const safeUpdateView = (
  visualization: React.MutableRefObject<View | null | undefined>,
  ref: React.MutableRefObject<HTMLDivElement | null>,
  spec: TopLevelSpec, 
  opts: ViewOptions = {}
) => {
  let view: View | undefined = undefined
  try {
    view = updateVegaView(ref, spec, opts)
  } catch (err) {
    warning(true, err)
  }
  if (isView(view)) {
    visualization.current = view
    return true
  }
  return false
}

export interface UseVegaOptions {
  overrides?: ViewOptions
}
export const useVega = (initialSpec: TopLevelSpec, opts?: UseVegaOptions) => {
  const [vegaWrapperRef, setWrapperRef] = useRefState<HTMLDivElement | null>(
    null
  )
  const currentSpec = useRef(initialSpec)
  const visualization = useRef<View | undefined | null>(null)
  // const forceUpdate = useForceUpdate()
  const [isLoading, setLoading] = useRefState(true)
  const [noData, setNoData] = useRefState(false)
  const [isError, setError] = useState(false)
  const updateView = useCallback(
    (spec) => {
      if (!vegaWrapperRef) {
        return
      }
      if (visualization.current) {
        visualization.current.finalize()
        visualization.current = null
      }
      const isValid =
        spec.data &&
        (spec.data.url ||
          (spec?.data?.values && spec?.data?.values?.length > 0))
      if (!isValid) {
        setNoData(true)
      } else {
        const error = !safeUpdateView(visualization, vegaWrapperRef, spec, opts ? opts.overrides : {})
        if (!error) {
          setNoData(false)
        } else {
          setError(true)
        }
      }
      setLoading(false)
    },
    [noData, setLoading, vegaWrapperRef]
  )

  const updateContainer = useCallback(
    (elementRef: HTMLDivElement) => {
      if (!elementRef) {
        return
      }
      setWrapperRef(elementRef)
    },
    [setWrapperRef]
  )

  useEffect(() => {
    if (!vegaWrapperRef.current) {
      return
    }
    updateView(currentSpec.current || initialSpec)
    return () => {
      if (visualization.current) {
        visualization.current.finalize()
      }
    }
  }, [vegaWrapperRef.current])

  return {
    ref: vegaWrapperRef,
    view: visualization,
    updateView,
    isLoading: isLoading.current,
    noData: noData.current,
    isError,
    updateContainer
  }
}
