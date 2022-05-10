export function setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

export function restoreTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  } else {
    setTheme('theme-light')
  }
}