import { BaseModule, getModule, modStorage } from 'bc-deeplib/deeplib';
import { GlobalSettingsModel } from '../models/settings';
import { languages } from '../utilities/languages';
import { GlobalModule } from './global';

export class CommandsModule extends BaseModule {

  get settings(): GlobalSettingsModel {
    return getModule<GlobalModule>('GlobalModule').settings;
  }

  init(): void {
    CommandCombine([
      {
        Tag: 'ttoggle',
        Action: () => {
          this.settings.modEnabled = !this.settings.modEnabled;
          const state = this.settings.modEnabled ? 'ON' : 'OFF';
          ChatRoomSendLocal(`Chat Translator is now ${state}`, 3000);
          modStorage.save();
        },
        Description: 'Toggle CATS on or off'
      },
      {
        Tag: 'tlang',
        Action: (targetLang) => {
          if (targetLang) {
            if (targetLang in languages && targetLang !== 'auto') {
              this.settings.targetLang = targetLang;
              modStorage.save();
              ChatRoomSendLocal(`Target language set to ${targetLang}`, 3000);
            } else {
              ChatRoomSendLocal(`Target language ${targetLang} is not available.`, 10000);
              ChatRoomSendLocal(`Supported languages: ${Object.keys(languages).filter(lang => lang !== 'auto').join(', ')}`, 10000);
            }
          } else {
            ChatRoomSendLocal('No target lang provided', 3000);
          }
        },
        Description: 'Change the target language of CATS.'
      },
      {
        Tag: 'slang',
        Action: (sourceLang) => {
          if (sourceLang) {
            if (sourceLang in languages || sourceLang === 'auto') {
              this.settings.sourceLang = sourceLang;
              modStorage.save();
              ChatRoomSendLocal(`Source language set to ${sourceLang}`, 3000);
            } else {
              ChatRoomSendLocal(`Source language ${sourceLang} is not available.`, 10000);
              ChatRoomSendLocal(`Supported languages: ${Object.keys(languages).join(', ')}`, 10000);
            }
          } else {
            ChatRoomSendLocal('No source lang provided', 3000);
          }
        },
        Description: 'Change the source language of CATS.'
      }
    ]);
  }
}