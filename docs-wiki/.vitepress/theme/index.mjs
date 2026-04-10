import DefaultTheme from 'vitepress/theme';
import { nextTick, watch } from 'vue';
import { useRoute } from 'vitepress';

let mermaidInstance = null;
let mermaidLoadPromise = null;

async function loadMermaidInstance() {
  if (mermaidInstance) {
    return mermaidInstance;
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  if (!mermaidLoadPromise) {
    mermaidLoadPromise = new Promise((resolve, reject) => {
      if (window.mermaid) {
        resolve(window.mermaid);
        return;
      }

      const base = (window.__VP_SITE_DATA__ && window.__VP_SITE_DATA__.base) ? window.__VP_SITE_DATA__.base : "/";
      const normalizedBase = base.endsWith("/") ? base : `${base}/`;
      const script = document.createElement("script");
      script.src = `${normalizedBase}mermaid.min.js`;
      script.async = true;
      script.onload = () => {
        if (window.mermaid) {
          resolve(window.mermaid);
          return;
        }
        reject(new Error("Mermaid loaded without exposing window.mermaid."));
      };
      script.onerror = () => reject(new Error(`Failed to load ${script.src}`));
      document.head.appendChild(script);
    }).then((instance) => {
      mermaidInstance = instance;
      mermaidInstance.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
      });
      return mermaidInstance;
    });
  }

  return mermaidLoadPromise;
}

async function renderMermaidDiagrams() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const mermaid = await loadMermaidInstance();
  if (!mermaid) {
    return;
  }

  const blocks = Array.from(document.querySelectorAll("pre code.language-mermaid"));
  for (const code of blocks) {
    const pre = code.parentElement;
    if (!pre || pre.dataset.docsWikiMermaid === "rendered") {
      continue;
    }

    pre.dataset.docsWikiMermaid = "rendered";
    const source = code.textContent || "";
    const wrapper = document.createElement("div");
    wrapper.className = "docs-wiki-mermaid";
    const id = `docs-wiki-mermaid-${Math.random().toString(36).slice(2)}`;

    try {
      const { svg, bindFunctions } = await mermaid.render(id, source);
      wrapper.innerHTML = svg;
      bindFunctions?.(wrapper);
      pre.replaceWith(wrapper);
    } catch (error) {
      pre.dataset.docsWikiMermaid = "error";
      console.error("[docs-wiki] Failed to render Mermaid diagram", error);
    }
  }
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();

    const refresh = () => nextTick(() => renderMermaidDiagrams());
    watch(() => route.path, refresh, { flush: "post" });
    nextTick(() => renderMermaidDiagrams());
  },
};
