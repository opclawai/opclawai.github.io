(function () {
  const root = document.documentElement;
  const storageKey = "photosort-lang";
  const saved = localStorage.getItem(storageKey);
  const initial = saved || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");

  function apply(lang) {
    root.dataset.lang = lang;
    root.lang = lang === "zh" ? "zh-Hans" : "en";
    localStorage.setItem(storageKey, lang);
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      button.textContent = lang === "zh" ? "English" : "中文";
      button.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    });
  }

  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => apply(root.dataset.lang === "zh" ? "en" : "zh"));
  });

  apply(initial);
})();
