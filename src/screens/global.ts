import { advElement, BaseSubscreen, layout } from 'bc-deeplib/deeplib';
import { languages } from '../utilities/languages';
import { GlobalSettingsModel } from '../models/settings';

export class GlobalSubscreen extends BaseSubscreen {

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get name(): string {
    return 'global';
  }

  load(): void {
    super.load();

    const modEnabledCheckbox = advElement.createCheckbox({
      id: 'cats-mod-enabled',
      label: 'CATS Mod Enabled',
      setElementValue: () => this.settings.modEnabled,
      setSettingValue: (val) => {
        this.settings.modEnabled = val;
      },
    });
    layout.appendToSettingsDiv(modEnabledCheckbox);

    const doShowNewVersionMessageCheckbox = advElement.createCheckbox({
      id: 'cats-do-show-new-version-message',
      label: 'Show new version message',
      setElementValue: () => this.settings.doShowNewVersionMessage,
      setSettingValue: (val) => {
        this.settings.doShowNewVersionMessage = val;
      },
    });
    layout.appendToSettingsDiv(doShowNewVersionMessageCheckbox);

    const sourceLangOptions: readonly Omit<HTMLOptions<'option'>, 'tag'>[] = Object.entries(languages).map(([key, value]) => ({
      attributes: {
        value: key,
        label: value,
        selected: key === this.settings.sourceLang
      }
    }));

    const sourceLangDropdown = ElementCreateDropdown('cats-source-lang', sourceLangOptions, (event) => {
      const sourceLang = (event.target as HTMLSelectElement)?.value;
      if (!sourceLang) return;

      this.settings.sourceLang = sourceLang;
    });
    layout.appendToSettingsDiv(sourceLangDropdown);

    const targetLangOptions: readonly Omit<HTMLOptions<'option'>, 'tag'>[] = Object.entries(languages).filter(([key]) => key !== 'auto').map(([key, value]) => ({
      attributes: {
        value: key,
        label: value,
        selected: key === this.settings.targetLang
      }
    }));

    const targetLangDropdown = ElementCreateDropdown('cats-target-lang', targetLangOptions, (event) => {
      const targetLang = (event.target as HTMLSelectElement)?.value;
      if (!targetLang) return;

      this.settings.targetLang = targetLang;
    });
    layout.appendToSettingsDiv(targetLangDropdown);
  }
}