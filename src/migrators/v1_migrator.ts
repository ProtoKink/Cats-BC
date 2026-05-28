import { BaseMigrator, getModule } from 'bc-deeplib/deeplib';
import { GoogleSourceLanguageCode, googleSourceLanguages, GoogleTargetLanguageCode, googleTargetLanguages } from '../utilities/languages';

export class V1_Migrator extends BaseMigrator {
  get migrationVersion(): string {
    return '1.0.0';
  }

  migrate(): void {
    const oldData = (Player.OnlineSettings as any).CATS as { enabled: boolean, sourceLang: string, targetLang: string } | undefined;
    if (!oldData) return;

    const globalSettings = getModule('GlobalModule').settings;
    const translatorSettings = getModule('TranslatorModule').settings;

    globalSettings.modEnabled = oldData.enabled;

    if (oldData.sourceLang in googleSourceLanguages)
      translatorSettings.google.incomingSourceLang = oldData.sourceLang as GoogleSourceLanguageCode;
    if (oldData.targetLang in googleTargetLanguages)
      translatorSettings.google.incomingTargetLang = oldData.targetLang as GoogleTargetLanguageCode;

    delete (Player.OnlineSettings as any).CATS;

    ServerAccountUpdate.QueueData({
      OnlineSettings: Player.OnlineSettings
    }, true);
  }
}