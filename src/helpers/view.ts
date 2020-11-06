import {
  View,
  parse as vegaParse,
  Config,
  // Config,
  // Spec
} from 'vega'
import { compile as vlCompile, TopLevelSpec } from 'vega-lite'
import vegaTooltip from 'vega-tooltip'
import { MutableRefObject } from 'react'
// import invariant from 'tiny-invariant'
const DEFAULT_OPTIONS: ViewOptions = {
  hover: true,
  renderer: 'canvas',
}

export type ViewOptions = ConstructorParameters<typeof View>[1]

export const updateVegaView = (viewReference: MutableRefObject<HTMLDivElement | null>, vlSpec?: TopLevelSpec,
  /*vegaSpec?: Spec, vegaConfig: Config = {},*/ overrideOptions: ViewOptions = {}) => {
  if (!viewReference || !viewReference.current || !vlSpec) return
  const opts: ViewOptions = {
    ...DEFAULT_OPTIONS,
    ...overrideOptions,
    container: viewReference.current,
  }
  // vegaParse()
  // const spec = vlSpec ? vlCompile(vlSpec).spec : vegaSpec
  const spec = vlCompile(vlSpec).spec
  // invariant(!spec, 'Vega lite or vega spec must be defined')
  // const config = vlSpec ? vlSpec.config : vegaConfig
  // @ts-ignore
  const runtime = vegaParse(spec, vlSpec.config as Config)
  const view = new View(runtime, opts)
  vegaTooltip(view)
  return view
}
