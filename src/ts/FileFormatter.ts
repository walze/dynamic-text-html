

export class FileFormatter {

  protected constructor(
    public flag: RegExp = /<<(.+)>>/u,
    public defaultCssSelector: string = '[field]',
  ) {

  }

  public matchFlag(text: string) {

    const matched = text.match(this.flag)

    return matched ? matched[1] : undefined

  }

  public replaceFlag(text: string, replaceWith: string = '\n') {

    return text.replace(this.flag, replaceWith)

  }

  public everyNthLineBreak(text: string, everyN: number = 0) {

    const lines = this
      .replaceFlag(text, '')
      .trim()
      .split(/\r\n|\r|\n/ug)

    const groups: string[] = []

    /** Blocks consecutive breaks */
    let blocked = false

    let groupsIndex = 0
    let breakCounter = 0

    lines.map((line) => {

      let goToNextGroup = false
      const isEmpty = line === ''

      if (!groups[groupsIndex])
        groups[groupsIndex] = ''

      if (isEmpty) breakCounter++
      else breakCounter = 0

      // if breakcounter matches param
      goToNextGroup = breakCounter === everyN && everyN !== 0

      groups[groupsIndex] += `${line}\r\n`

      if (!goToNextGroup)
        blocked = false

      if (goToNextGroup && !blocked) {

        groupsIndex++
        blocked = true

      }

    })

    return groups

  }

}