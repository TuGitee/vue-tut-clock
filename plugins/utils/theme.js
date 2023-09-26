function switchTheme() {
    let currentTheme = localStorage.getItem('theme') ?? 'light'
    return () => {
        localStorage.setItem('theme', currentTheme)
        currentTheme = currentTheme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", currentTheme);
    }
}

export default {
    install(Vue) {
        Vue.prototype.$switchTheme = switchTheme()
        Vue.prototype.$switchTheme()
    }
}