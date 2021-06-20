import {ColorGeneratorByName} from 'utils/ColorGeneratorByName'
import {COLORS} from 'static/colors'

describe('ColorGeneratorByName', () => {
  it('Should return pelorous color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Alex1')

    expect(colorGeneratorByName.generate()).toBe(COLORS.pelorous)
  })

  it('Should return carouselPink color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Mark1')

    expect(colorGeneratorByName.generate()).toBe(COLORS.carouselPink)
  })

  it('Should return matrix color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Anna')

    expect(colorGeneratorByName.generate()).toBe(COLORS.matrix)
  })

  it('Should return copper color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Alex')

    expect(colorGeneratorByName.generate()).toBe(COLORS.copper)
  })

  it('Should return blueMarguerite color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Mark')

    expect(colorGeneratorByName.generate()).toBe(COLORS.blueMarguerite)
  })

  it('Should return apple color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Kate')

    expect(colorGeneratorByName.generate()).toBe(COLORS.apple)
  })

  it('Should return apple color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('Kate')

    expect(colorGeneratorByName.generate()).toBe(COLORS.apple)
  })

  it('Should return white color', () => {
    const colorGeneratorByName = new ColorGeneratorByName('')

    expect(colorGeneratorByName.generate()).toBe(COLORS.white)
  })
})
