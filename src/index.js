
import { formatFatherChild } from './customFormatters'
import Formatter from './js/Formatter'
import DynamicText from './js/DynamicText'


const formatter = new Formatter(
  /\[\[(.+)\]\]/,
  '[field]',
  {
    LIST: (ref, texto) => {
      return formatFatherChild(
        ref.breakLines(texto, 3),
        '[items]',
        '[head]',
        '[item]'
      )
    },
  }
)

const fields = new DynamicText(formatter)

console.log(fields)
