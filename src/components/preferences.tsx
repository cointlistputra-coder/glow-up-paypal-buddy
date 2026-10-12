import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import translations from '@/data/translations.json';

export type Language = 'id' | 'en';

export function translate(text: string, language: Language) {
  return language === 'en' ? (translations as Record<string, string>)[text] ?? text : text;
}

const Preferences = createContext({
  language: 'id' as Language,
  tr: (text: string) => text,
  setLanguage: (_language: Language) => {},
  dark: false,
  toggleTheme: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('dc-language');
      setLanguageState(storedLang === 'en' ? 'en' : 'id');

      const storedTheme = localStorage.getItem('dc-theme');
      if (storedTheme) {
        setDark(storedTheme === 'dark');
      } else {
        setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    } catch {
      setDark(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('dc-language', language);
      localStorage.setItem('dc-theme', dark ? 'dark' : 'light');
    } catch {
      // storage exception ignored
    }
  }, [language, dark, ready]);

  const setLanguage = (value: Language) => setLanguageState(value);
  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <Preferences.Provider
      value={{
        language,
        tr: (text) => translate(text, language),
        setLanguage,
        dark,
        toggleTheme,
      }}
    >
      {children}
    </Preferences.Provider>
  );
}

export function usePreferences() {
  return useContext(Preferences);
}

export function PreferenceControls() {
  const { language, setLanguage, dark, toggleTheme, tr } = usePreferences();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border)',
        borderRadius: '9999px',
        padding: '3px 8px',
      }}
    >
      <Globe size={13} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} aria-hidden="true" />
      <select
        aria-label={tr('Pilih bahasa')}
        value={language}
        onChange={(e) => setLanguage(e.target.value === 'en' ? 'en' : 'id')}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--foreground)',
          cursor: 'pointer',
          outline: 'none',
          padding: '2px 4px',
        }}
      >
        <option value="id" style={{ background: 'var(--card)', color: 'var(--foreground)' }}>ID</option>
        <option value="en" style={{ background: 'var(--card)', color: 'var(--foreground)' }}>EN</option>
      </select>

      <span style={{ color: 'var(--border)', userSelect: 'none' }}>|</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        style={{ width: '24px', height: '24px', padding: 0, borderRadius: '50%' }}
        aria-label={tr(dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap')}
        title={tr(dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap')}
      >
        {dark ? <Sun size={14} style={{ color: '#f59e0b' }} /> : <Moon size={14} />}
      </Button>
    </div>
  );
}
