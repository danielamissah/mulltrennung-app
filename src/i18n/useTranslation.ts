import { translations, Language, Translations } from './translations';
import { useAppStore } from '../store/useAppStore';

export function useTranslation(): { t: Translations; lang: Language } {
  const lang = useAppStore((s) => s.language);
  return { t: translations[lang], lang };
}