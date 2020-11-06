<img width='250px' src="./hooks-vega.png">
<h1 align="center">useVega ⚛</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/bbenzikry" target="_blank">
    <img alt="Twitter: bbenzikry" src="https://img.shields.io/twitter/follow/bbenzikry.svg?style=social" />
  </a>
</p>

> Simple react hook for rendering Vega/Vega lite specifications

### ✨ [Demo](https://bbenzikry.github.io/use-vega)

## Install

```sh
yarn install @bbenzikry/use-vega
```

## Usage

```tsx
import {useVega} from '@bbenzikry/use-vega'
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

## Author

👤 **Beni Ben Zikry**

* Twitter: [@bbenzikry](https://twitter.com/bbenzikry)
* Github: [@bbenzikry](https://github.com/bbenzikry)

## Show your support

Give a ⭐️ if this project helped you!