import {COLORS} from 'static/colors'
import {CONSONANTS, VOWELS} from 'static/constants'

export class ColorGeneratorByName {
  private readonly name: string
  private readonly vowels = VOWELS
  private readonly consonants = CONSONANTS

  constructor(name: string) {
    this.name = name.toLowerCase()
  }

  private isNameContainsNumbers() {
    const regex = new RegExp(/\d/)

    return regex.test(this.name)
  }

  private isNameStartWithVowel() {
    return this.vowels.includes(this.name.charAt(0))
  }

  private isNameStartWithConsonant() {
    return this.consonants.includes(this.name.charAt(0))
  }

  private isNameEndWithVowel() {
    return this.vowels.includes(this.name.slice(-1))
  }

  private isNameEndWithConsonant() {
    return this.consonants.includes(this.name.slice(-1))
  }

  generate() {
    if (this.isNameContainsNumbers() && this.isNameStartWithVowel()) {
      return COLORS.pelorous
    }

    if (this.isNameContainsNumbers() && this.isNameStartWithConsonant()) {
      return COLORS.carouselPink
    }

    if (this.isNameStartWithVowel() && this.isNameEndWithVowel()) {
      return COLORS.matrix
    }

    if (this.isNameStartWithVowel() && this.isNameEndWithConsonant()) {
      return COLORS.copper
    }

    if (this.isNameStartWithConsonant() && this.isNameEndWithConsonant()) {
      return COLORS.blueMarguerite
    }

    if (this.isNameStartWithConsonant() && this.isNameEndWithVowel()) {
      return COLORS.apple
    } else return COLORS.white
  }
}
