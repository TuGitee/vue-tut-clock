export function switchTheme() {
    let currentTheme = localStorage.getItem('theme') ?? 'light'
    return () => {
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem('theme', currentTheme)
        currentTheme = currentTheme === "dark" ? "light" : "dark"
        return currentTheme
    }
}