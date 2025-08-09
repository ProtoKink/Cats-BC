import { BaseModule } from 'bc-deeplib/deeplib';
import { GlobalSettingsModel } from '../models/settings';
import { translate } from '../utilities/translation';
import { Subscreen } from 'bc-deeplib/base/base_subscreen';
import { GlobalSubscreen } from '../screens/global';

export class GlobalModule extends BaseModule {

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  set settings(val) {
    super.settings = val;
  }

  get settingsScreen(): Subscreen | null {
    return GlobalSubscreen;
  }

  get defaultSettings() {
    return <GlobalSettingsModel>{
      modEnabled: true,
      doShowNewVersionMessage: true,
      sourceLang: 'auto',
      targetLang: 'en',
      translationEngine: 'google',
      deeplApiPlan: 'free',
      deeplApiKey: '',
    };
  }

  init() {
    super.init();

    ChatRoomRegisterMessageHandler({
      Description: 'Translates a message and does some stuff with it.',
      Priority: 501,
      Callback: (data) => {
        if (!this.settings.modEnabled) return false;

        if (data.Type === 'Chat' && data.Sender !== Player.MemberNumber) {
          const sourceMessage = data.Content;
          translate(sourceMessage, this.settings.sourceLang, this.settings.targetLang).then((translatedMessage) => {
            ChatRoomSendLocal(translatedMessage, 3000);
          });
        }

        return false;
      },
    });
  }
}