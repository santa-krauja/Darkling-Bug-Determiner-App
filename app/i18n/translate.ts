import i18n from "i18n-js"
import { TxKeyPath } from "./i18n"
import { BugBodyPart } from "app/services/determiner/BugBodyPart"

/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
  return i18n.t(key, options)
}

export function translateBodyPart(key: BugBodyPart, options?: i18n.TranslateOptions): string {
  let translationKey: string

  switch (key) {
    case 'leg':
      translationKey = 'bodyPart.leg'
      break
    case 'tentacles':
      translationKey = 'bodyPart.tentacles'
      break
    case 'head':
      translationKey = 'bodyPart.head'
      break
    case 'front_wings':
      translationKey = 'bodyPart.front_wings'
      break
    case 'fore_chest':
      translationKey = 'bodyPart.fore_chest'
      break
    default:
      throw new Error(`Invalid BugBodyPart key: ${key}`)
  }

  return i18n.t(translationKey, options)
}
