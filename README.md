<img width='350px' src="./hooks-vega.png">
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

## Prerequisites

use-vega requires [vega]() and [vega-lite]()

## Install

```sh
yarn add --production use-vega
# OR
npm install use-vega
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

## Notes and FAQ

* The implementation is less performant than the one in [react-vega](https://github.com/vega/react-vega) as we recreate the view on change instead of doing a more in-depth comparison / update changesets.
This will be changed in a future version dependent on traction.
Feel free to PR if this bothers you 😁

## Author

👤 **Beni Ben Zikry**

* Twitter: [@bbenzikry](https://twitter.com/bbenzikry)
* Github: [@bbenzikry](https://github.com/bbenzikry)

## Show your support

Give a ⭐️ if this project helped you!