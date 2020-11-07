// Taken straight from react-vega

export type PlainObject = {
  [key: string]: unknown
}

export type SignalListener = (name: string, value: unknown) => void

export type SignalListeners = {
  [key: string]: SignalListener
}
