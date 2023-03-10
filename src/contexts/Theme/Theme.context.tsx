import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeOptions<
  ThemeOptionsExtension extends string = "light" | "dark"
> = ThemeOptionsExtension;

export interface ThemeContextProps {
  theme: ThemeOptions;
  onThemeSwitch: ((_theme: ThemeOptions) => void) | null;
}

const ThemeContext = createContext<{
  theme: ThemeOptions;
  onThemeSwitch: ((_theme: ThemeOptions) => void) | null;
}>({
  theme: "light",
  onThemeSwitch: null,
});

export interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeOptions>("light");

  function onThemeSwitch(_theme: ThemeOptions) {
    localStorage.setItem("theme", _theme);
    setTheme(_theme);
  }

  function _initialLoader() {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme(localStorage.getItem("theme") as ThemeOptions);
    }
  }

  useEffect(() => {
    _initialLoader();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, onThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
