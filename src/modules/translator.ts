import { BaseModule } from 'bc-deeplib/deeplib';
import { GoogleSourceLanguageCode, GoogleTargetLanguageCode } from '../utilities/languages';
import { TranslatorSettingsModel } from '../models/settings';
import { TranslatorSubscreen } from '../screens/translator';

interface GoogleData {
  translation: string;
  sourceLanguage: GoogleSourceLanguageCode;
}

export interface TranslatedMessage {
  text: string;
  sourceLanguage: GoogleSourceLanguageCode;
}

export class TranslatorModule extends BaseModule {
  private static _instance: TranslatorModule;

  constructor() {
    super();
    TranslatorModule._instance = this;
  }

  get settingsScreen() {
    return TranslatorSubscreen;
  }

  get settings(): TranslatorSettingsModel {
    return super.settings as TranslatorSettingsModel;
  }

  set settings(val) {
    super.settings = val;
  }

  get defaultSettings(): TranslatorSettingsModel {
    return {
      google: {
        incomingSourceLang: 'auto',
        incomingTargetLang: 'en',
        // outcomingSourceLang: 'auto',
        // outcomingTargetLang: 'en',
      }
    };
  }

  private static async googleTranslate(text: string, sourceLang: GoogleSourceLanguageCode, targetLang: GoogleTargetLanguageCode): Promise<GoogleData> {
    const url = 'https://translate-pa.googleapis.com/v1/translate?' + new URLSearchParams({
      'params.client': 'gtx',
      'dataTypes': 'TRANSLATION',
      'key': 'AIzaSyDLEeFI5OtFBwYBIoK_jj5m32rZK5CkCXA', // some google API key
      'query.sourceLanguage': sourceLang,
      'query.targetLanguage': targetLang,
      'query.text': text,
    });

    const res = await fetch(url);
    if (!res.ok)
      throw new Error(
        `Failed to translate "${text}" (${sourceLang} -> ${targetLang})`
        + `\n${res.status} ${res.statusText}`
      );

    const { sourceLanguage, translation }: GoogleData = await res.json();

    return {
      sourceLanguage,
      translation,
    };
  }

  static async translate(text: string): Promise<TranslatedMessage | undefined> {
    const translatorSettings = TranslatorModule._instance.settings;

    const { sourceLanguage, translation } = await TranslatorModule.googleTranslate(text, translatorSettings.google.incomingSourceLang, translatorSettings.google.incomingTargetLang);
    return { sourceLanguage, text: translation };

    throw new Error('uhoh, no translator module selected');
  }
}