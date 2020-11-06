import 'react-app-polyfill/ie11'
import * as React from 'react'
import {useEffect} from 'react'
// import { useEffect } from 'react';
import * as ReactDOM from 'react-dom'
import { useVega } from '../.'
import spec from '../samples/vegaLiteSampleSpec'

const App = () => {
  const { ref, isError, isLoading, noData,updateView,view } = useVega({...spec}, {})
  // const { ref, isError, isLoading, noData } = useVega({...spec, mark: undefined}, {})
  const renderCount = React.useRef(0)
  useEffect(() => {
    renderCount.current += 1
    console.log(`render count ${renderCount.current} and noData: ${noData}`)
  })
  return (
    <div>
      <div ref={ref} />
      {isError && <div>error</div>}
      {noData && <div>no data</div>}
      {isLoading && <div>isloading</div>}
    <button onClick={()=>{
      // @ts-ignore
      const color = view?.current?._background
      const background = color === 'white' ? 'black' : 'white'
      updateView({...spec,  background})
      }} style={{border: '1px solid black', width:'fit-content'}}>Example - Change background</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
