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

  const isDark = document.documentElement.classList.contains("dark");
  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: isDark ? "dark" : "default",
    });
  } catch (_e) {
    /* ignore */
  }

  const candidates = [];
  document.querySelectorAll('div[class*="language-mermaid"]').forEach((container) => {
    const code = container.querySelector("pre code");
    if (code) {
      candidates.push({ container, code });
    }
  });
  document.querySelectorAll("pre code.language-mermaid").forEach((code) => {
    const pre = code.parentElement;
    if (!pre) {
      return;
    }
    const parent = pre.parentElement;
    if (parent && parent.classList && [...parent.classList].some((c) => c.includes("language-mermaid"))) {
      return;
    }
    candidates.push({ container: pre, code, legacy: true });
  });

  for (const { container, code, legacy } of candidates) {
    const markTarget = legacy ? code.parentElement : container;
    if (!markTarget || markTarget.dataset.docsWikiMermaid === "rendered" || markTarget.dataset.docsWikiMermaid === "error") {
      continue;
    }

    const source = (code.textContent || "").replace(/\u00a0/g, " ").trim();
    if (!source) {
      continue;
    }

    markTarget.dataset.docsWikiMermaid = "rendered";
    const wrapper = document.createElement("div");
    wrapper.className = "docs-wiki-mermaid";
    const id = `docs-wiki-mermaid-${Math.random().toString(36).slice(2)}`;

    try {
      const out = await mermaid.render(id, source);
      const svg = typeof out === "string" ? out : out.svg;
      const bindFunctions = typeof out === "string" ? null : out.bindFunctions;
      wrapper.innerHTML = svg;
      bindFunctions?.(wrapper);
      if (legacy) {
        markTarget.replaceWith(wrapper);
      } else {
        container.replaceWith(wrapper);
      }
    } catch (error) {
      markTarget.dataset.docsWikiMermaid = "error";
      console.error("[docs-wiki] Failed to render Mermaid diagram", error);
    }
  }
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();

    const scheduleRender = () => {
      nextTick(() => {
        const run = () => renderMermaidDiagrams();
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(() => setTimeout(run, 0));
        } else {
          setTimeout(run, 0);
        }
      });
    };
    watch(() => route.path, scheduleRender, { flush: "post" });
    scheduleRender();
  },
};
