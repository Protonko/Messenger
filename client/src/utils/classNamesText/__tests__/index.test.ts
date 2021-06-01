import {classNamesText} from 'utils/classNamesText'

const regexp = 'text--test'
const regexpCustomStyle = 'custom-style'

describe('classNamesText', () => {
  it(`Should find modifier "${regexp}"`, () => {
    expect(classNamesText('test').indexOf(regexp)).toBeGreaterThan(-1)
  })

  it(`Should find "${regexpCustomStyle}"`, () => {
    expect(
      classNamesText('test', regexpCustomStyle).indexOf(regexpCustomStyle),
    ).toBeGreaterThan(-1)
  })
})
