import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import translations from '@/data/translations.json';

export type Language = 'id' | 'en';
export function translate(text: string, language: Language) {
  return language === 'en' ? (translations as Record<string, string>)[text] ?? text : text;
}
const Preferences = createContext({ language: 'id' as Language, tr: (text: string) => text, setLanguage: (_language: Language) => {}, dark: false, toggleTheme: () => {} });
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const pathLanguage = window.location.pathname.startsWith('/en/') ? 'en' : undefined;
    try {
      setLanguageState(pathLanguage ?? (localStorage.getItem('dc-language') === 'en' ? 'en' : 'id'));
      const stored = localStorage.getItem('dc-theme');
      setDark(stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch { setDark(window.matchMedia('(prefers-color-scheme: dark)').matches); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem('dc-language', language); localStorage.setItem('dc-theme', dark ? 'dark' : 'light'); } catch { /* Display preferences still work when storage is unavailable. */ }
  }, [language, dark, ready]);
  const setLanguage = (value: Language) => setLanguageState(value);
  return <Preferences.Provider value={{language, tr: text => translate(text, language), setLanguage, dark, toggleTheme: () => setDark(value => !value)}}>{children}</Preferences.Provider>;
}
export function usePreferences() { return useContext(Preferences); }
export function PreferenceControls() {
  const { language, setLanguage, dark, toggleTheme, tr } = usePreferences();
  return <div className="preference-controls"><Globe size={15} aria-hidden="true"/><select aria-label={tr('Pilih bahasa')} value={language} onChange={event => setLanguage(event.target.value === 'en' ? 'en' : 'id')}><option value="id">ID · Indonesia</option><option value="en">EN · English</option></select><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={tr(dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap')} title={tr(dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap')}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</Button></div>;
}