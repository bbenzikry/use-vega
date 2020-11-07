<img width='350px' src="https://user-images.githubusercontent.com/1993348/98430757-6fff3680-20b8-11eb-9b31-617f6d27b1fa.png">
<h1 align="center">useVega ⚛</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.4.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/bbenzikry" target="_blank">
    <img alt="Twitter: bbenzikry" src="https://img.shields.io/twitter/follow/bbenzikry.svg?style=social" />
  </a>
</p>

> Simple react hook for rendering Vega/Vega lite specifications

### ✨ [Demo](https://bbenzikry.github.io/use-vega)

## Prerequisites

use-vega requires [vega](https://www.npmjs.com/package/vega) and [vega-lite](https://www.npmjs.com/package/vega-lite)

## Install

```sh
yarn add --production use-vega
# OR
npm install use-vega
```

## Usage

```tsx
import {useVega} from 'use-vega'
const spec = /* some vega / vega lite spec here*/;
const SomeChart = () => {
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
```

## Notes and FAQ

The implementation is less performant than the one in [react-vega](https://github.com/vega/react-vega) as we recreate the view on change instead of doing a more in-depth comparison / update changesets.  
This will change in a future version dependent on traction.  
Feel free to PR if this bothers you 😁

## Show your support

Give a ⭐️ if this project helped you!
