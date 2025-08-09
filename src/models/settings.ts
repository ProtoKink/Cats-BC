import { BaseSettingsModel } from 'bc-deeplib/deeplib';

export interface SettingsModel {
  global: GlobalSettingsModel;
}

export interface GlobalSettingsModel extends BaseSettingsModel {
  translationEngine: 'deepl' | 'google';
  deeplApiPlan: 'free' | 'pro';
  deeplApiKey: string;
  sourceLang: string;
  targetLang: string;
}