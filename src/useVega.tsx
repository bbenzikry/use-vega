import { useRef, useEffect, useCallback, useState } from 'react'
import { TopLevelSpec } from 'vega-lite'
import { Spec, UrlData, View } from 'vega'
import { updateVegaView, ViewOptions } from './helpers/view'
import useRefState from './hooks/useRefState'
import warning from 'tiny-warning'
import { InlineData, NamedData } from 'vega-lite/build/src/data'
import { GrammerType } from './enums/GrammerType'
import { PlainObject, SignalListeners } from './types'
import shallowEqual from './utils/shallowEqual'
// import useForceUpdate from './hooks/useForceUpdate'

const isView = (view: View | null | undefined): view is View => {
  return !!view && !!view?.addDataListener
}
const safeUpdateView = (
  visualization: React.MutableRefObject<View | null | undefined>,
  ref: React.MutableRefObject<HTMLDivElement | null>,
  spec: TopLevelSpec,
  opts: ViewOptions = {},
  grammer?: GrammerType
) => {
  let view: View | undefined = undefined
  try {
    view = updateVegaView(ref, spec, opts, grammer)
  } catch (err) {
    warning(true, err)
    return err
  }
  if (isView(view)) {
    visualization.current = view
    return false
  }
  return new Error('Could not load view')
}

export interface UseVegaOptions {
  overrides?: ViewOptions
  grammer?: GrammerType
}

const validateData = (spec: Spec | TopLevelSpec) => {
  return !!(
    (spec.data && (spec.data as UrlData).url) ||
    (!Array.isArray(spec?.data) && (spec?.data as InlineData).values) ||
    (Array.isArray(spec?.data) &&
      spec?.data.length > 0 &&
      (spec?.data[0] as NamedData).name)
  )
}
export const useVega = (
  initialSpec: TopLevelSpec | Spec,
  opts?: UseVegaOptions,
  signalListeners?: SignalListeners
) => {
  const [vegaWrapperRef, setWrapperRef] = useRefState<HTMLDivElement | null>(
    null
  )
  const currentSpec = useRef(initialSpec)
  const visualization = useRef<View | undefined | null>(null)
  const [isLoading, setLoading] = useRefState(true)
  const [noData, setNoData] = useRefState(false)
  const [error, setError] = useState(null)
  const updateView = useCallback(
    (spec) => {
      if (!vegaWrapperRef) {
        return
      }
      if (
        !isLoading.current &&
        shallowEqual(spec, currentSpec.current as PlainObject)
      ) {
        return
      }
      currentSpec.current = spec
      if (visualization.current) {
        visualization.current.finalize()
        visualization.current = null
      }
      const isValid = validateData(spec)
      if (!isValid) {
        setNoData(true)
      } else {
        const error = safeUpdateView(
          visualization,
          vegaWrapperRef,
          spec,
          opts ? opts.overrides : {},
          opts?.grammer || GrammerType.VEGA_LITE
        )
        if (!error) {
          setNoData(false)
          setError(null)
        } else {
          setError(error)
        }
      }
      setLoading(false)
    },
    [setLoading, opts, setNoData]
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
    updateView(initialSpec)
    return () => {
      if (visualization.current) {
        visualization.current.finalize()
      }
    }
  }, [initialSpec, updateView])

  useEffect(() => {
    const currentListeners = signalListeners
    if (!currentListeners) {
      return
    }
    const viz = visualization.current
    if (!viz) {
      return
    }
    const listenerNames = Object.keys(currentListeners)
    listenerNames.forEach((listenerName) => {
      viz.addSignalListener(listenerName, currentListeners[listenerName])
    })
    return () => {
      listenerNames.forEach((listenerName) => {
        try {
          viz.removeSignalListener(listenerName, currentListeners[listenerName])
        } catch (error) {
          console.warn('Cannot remove invalid signal listener.', error)
        }
      })
    }
  }, [signalListeners])

  return {
    ref: vegaWrapperRef,
    view: visualization,
    updateView,
    isLoading: isLoading.current,
    noData: noData.current,
    error,
    updateContainer,
  }
}
