import React from 'react'
import ReactDOM from 'react-dom'
import {createRenderer} from 'fela'
import {rehydrate} from 'fela-dom'
import {RendererProvider} from 'react-fela'

// Rehydrate fela
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Rehydrate prerendered <Island /> components
import ExampleComponent from '../components/example_component/example_component'
const hydratableComponents = {
  ExampleComponent
}

document
  .querySelectorAll('[data-sanblas-hydrate-as]')
  .forEach((island) => {
    const Component = hydratableComponents[island.dataset.sanblasHydrateAs]
    const componentProps = JSON.parse(island.dataset.sanblasHydrateWith)
    const element = (
      <RendererProvider renderer={felaRenderer}>
        <Component {...componentProps} />
      </RendererProvider>
    )
    ReactDOM.hydrate(element, island)
  })

// You might want to mount or rehydrate other client side components here, e.g.
// document
//   .querySelectorAll('[data-footnote]')
//   .forEach((el) => fancyFootnote(el))