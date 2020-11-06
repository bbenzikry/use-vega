import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useVega } from '../src/useVega'
import defaultSpec from '../samples/vegaLiteSampleSpec'
import TestComponent from './TestComponent'
describe('when rendered with a simple spec', () => {
  it('renders vega canvas', async () => {
    const { container } = render(
      //@ts-ignore
      <TestComponent spec={defaultSpec} />
    )
    await waitFor(() => {
      expect(container).toContainHTML('canvas')
    })
  })
})

describe('when rendered with a malformed spec', () => {
  it('identifies an error', async () => {
    const { result } = renderHook(() => useVega({...defaultSpec, mark: undefined}))
    act(() => {
      const element = document.createElement('div')
      result.current.updateContainer(element)
    })
    expect(result.current.isError).toBeTruthy()
  })
})

describe('when spec is well formed', () => {
  describe('When data is provided', () => {
    it('returns noData = false', async () => {
      const {
        result
        //@ts-ignore
      } = renderHook(() => useVega(defaultSpec))
      act(() => {
        result.current.updateContainer(document.createElement('div'))
      })
      expect(result.current.noData).toBe(false)
    })
  })

  describe('When no data is provided', () => {
    it('returns noData = true', async () => {
      const {
        result
        //@ts-ignore
      } = renderHook(() => useVega({ ...defaultSpec, data: [] }))
      act(() => {
        result.current.updateContainer(document.createElement('div'))
      })
      expect(result.current.noData).toBe(true)
    })
  })
})
