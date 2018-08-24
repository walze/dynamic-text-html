
import Formatter from './js/Formatter'
import DynamicText from './js/DynamicText'

const p1 = performance.now()

/**
 * @type { triggerParamType }
 */
const triggers = {
  default: fields => console.warn('Default fields:', fields),

  list(file, divs) {

    console.warn('"list" fields:', divs)

    const selectors = [
      '[head]',
      '[item]'
    ]

    // const lines = this.everyNthLineBreak(file.data, 3)

    console.log(
      this.everyNthLineBreak(file.data, 2),
    )

    // return this.formatFatherChildren(lines, divs, selectors, true)

  },
}


const files = require('./textos/**.txt')
const formatter = new Formatter({ triggers })
const fields = new DynamicText(formatter, files)


window.addEventListener('load', () => {

  const perf = performance.now() - p1
  console.log(`Window loaded in ${Math.round(perf)}ms`)
  console.log(fields)

})

window.addEventListener('DYNAMIC_LOADED', () => {

  const perf = performance.now() - p1
  console.log(`Files loaded in ${Math.round(perf)}ms`)

})


const makeElement = (el, text, array) => {

  return `<${el} class="${array.join(' ')}>${text}</${el}>`

}

const el = makeElement('h4', 'AAAA', [
  'linhas',
  'crete',
  'center-align'
])

console.log(el)
