import { GUI, initMod } from 'bc-deeplib/deeplib';
import { CommandsModule } from './modules/commands';
import { GlobalModule } from './modules/global';

export const { sdk } = initMod({
  modInfo: {
    info: {
      name: 'Cats',
      version: MOD_VERSION,
      fullName: 'Chat Auto Translator Script',
    }
  },
  modules: [
    new GUI({
      ButtonText: 'CATS',
      Identifier: 'CATS',
      Image: `${PUBLIC_URL}/images/mod.svg`,
    }),
    new GlobalModule(),
    new CommandsModule(),
  ],
  translationOptions: {
    pathToTranslationsFolder: `${PUBLIC_URL}/translations/`,
  }
});
