import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  COMPONENT_CATALOG,
  PORTFOLIO_URL,
  categoryLabel,
  descriptionLabel,
  fileRole,
  tagsFor,
  titleLabel,
  type ComponentEntry,
  type Lang,
} from "../data/componentCatalog";

const STRINGS = {
  pt: {
    skip: "Pular para o conteúdo principal",
    name: "Lucas Gabriel Rodrigues",
    slash: "/",
    discipline: "UX Design & Web Design",
    libraryLine: "Biblioteca de componentes",
    portfolio: "Portfólio",
    accessTitle: "Acesso à biblioteca",
    accessSubtitle: "Escolha um componente para ver ficheiros, copiar caminhos e abrir a demo quando existir.",
    back: "Outros componentes",
    filesTitle: "Ficheiros no repositório",
    copyPath: "Copiar caminho",
    copied: "Copiado",
    copyFail: "Não foi possível copiar",
    openDemo: "Abrir demo",
    demoHint: "Pré-visualização servida por este projeto (pasta public/library).",
    noDemo: "Este bloco não tem página de demo; usa os ficheiros listados.",
    footer: "Lucas Gabriel Rodrigues — UX Design & Web Design",
    footerNote:
      "Página origem da Biblioteca UI para integração futura no portfólio.",
    tagsAria: "Etiquetas",
    langGroup: "Idioma",
  },
  en: {
    skip: "Skip to main content",
    name: "Lucas Gabriel Rodrigues",
    slash: "/",
    discipline: "UX Design & Web Design",
    libraryLine: "Component library",
    portfolio: "Portfolio",
    accessTitle: "Library access",
    accessSubtitle:
      "Pick a component to see files, copy paths, and open the demo when available.",
    back: "All components",
    filesTitle: "Files in the repository",
    copyPath: "Copy path",
    copied: "Copied",
    copyFail: "Could not copy",
    openDemo: "Open demo",
    demoHint: "Preview is served by this app (public/library folder).",
    noDemo: "No demo page for this block — use the files listed.",
    footer: "Lucas Gabriel Rodrigues — UX Design & Web Design",
    footerNote:
      "Biblioteca UI origin page — prepared for future portfolio integration.",
    tagsAria: "Tags",
    langGroup: "Language",
  },
} as const;

function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${path.replace(/^\//, "")}`;
}

export const BibliotecaOrigem = () => {
  const [lang, setLang] = useState<Lang>("pt");
  const [selected, setSelected] = useState<ComponentEntry | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [failedPath, setFailedPath] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement>(null);
  const mainId = useId();
  const t = STRINGS[lang];

  const copyPath = useCallback(async (repoPath: string) => {
    try {
      await navigator.clipboard.writeText(repoPath);
      setCopiedPath(repoPath);
      setFailedPath(null);
      window.setTimeout(() => setCopiedPath(null), 2000);
    } catch {
      setFailedPath(repoPath);
      setCopiedPath(null);
      window.setTimeout(() => setFailedPath(null), 2000);
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    detailRef.current?.focus();
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="lgr-page">
      <a className="lgr-skip" href={`#${mainId}`}>
        {t.skip}
      </a>

      <header className="lgr-top" role="banner">
        <div className="lgr-top__inner">
          <div className="lgr-brand">
            <a
              className="lgr-brand__name"
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t.name}
            </a>
            <span className="lgr-brand__slash" aria-hidden="true">
              {t.slash}
            </span>
            <span className="lgr-brand__discipline">{t.discipline}</span>
            <span className="lgr-brand__library">{t.libraryLine}</span>
          </div>
          <div className="lgr-top__actions">
            <a
              className="lgr-link-quiet"
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t.portfolio}
            </a>
            <div className="lgr-lang" role="group" aria-label={t.langGroup}>
              <button
                type="button"
                className={`lgr-lang__btn${lang === "pt" ? " is-active" : ""}`}
                onClick={() => setLang("pt")}
                aria-pressed={lang === "pt"}
              >
                PT
              </button>
              <span className="lgr-lang__sep" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className={`lgr-lang__btn${lang === "en" ? " is-active" : ""}`}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id={mainId} className="lgr-main" tabIndex={-1}>
        <section className="lgr-hero" aria-labelledby="lgr-access-title">
          <h1 id="lgr-access-title" className="lgr-hero__title">
            {t.accessTitle}
          </h1>
          <p className="lgr-hero__subtitle">{t.accessSubtitle}</p>
        </section>

        {selected ? (
          <section
            ref={detailRef}
            className="lgr-detail"
            tabIndex={-1}
            aria-label={titleLabel(selected, lang)}
          >
            <button
              type="button"
              className="lgr-back"
              onClick={() => setSelected(null)}
            >
              ← {t.back}
            </button>
            <div className="lgr-detail__head">
              <p className="lgr-detail__category">
                {categoryLabel(selected, lang)}
              </p>
              <h2 className="lgr-detail__title">
                {titleLabel(selected, lang)}
              </h2>
              <p className="lgr-detail__desc">
                {descriptionLabel(selected, lang)}
              </p>
              <ul className="lgr-tags" aria-label={t.tagsAria}>
                {tagsFor(selected, lang).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="lgr-detail__grid">
              <div className="lgr-panel">
                <h3 className="lgr-panel__title">{t.filesTitle}</h3>
                <ul className="lgr-file-list">
                  {selected.files.map((file) => (
                    <li key={file.repoPath} className="lgr-file">
                      <div className="lgr-file__meta">
                        <span className="lgr-file__name">{file.name}</span>
                        <span className="lgr-file__role">
                          {fileRole(file, lang)}
                        </span>
                      </div>
                      <code className="lgr-file__path">{file.repoPath}</code>
                      <button
                        type="button"
                        className="lgr-btn-copy"
                        onClick={() => copyPath(file.repoPath)}
                      >
                        {copiedPath === file.repoPath
                          ? t.copied
                          : failedPath === file.repoPath
                            ? t.copyFail
                            : t.copyPath}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lgr-panel lgr-panel--demo">
                <h3 className="lgr-panel__title">Demo</h3>
                {selected.demoUrl ? (
                  <>
                    <p className="lgr-panel__hint">{t.demoHint}</p>
                    <a
                      className="lgr-btn-demo"
                      href={withBase(selected.demoUrl)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.openDemo}
                    </a>
                    <div className="lgr-embed-wrap">
                      <iframe
                        title={`${titleLabel(selected, lang)} — preview`}
                        src={withBase(selected.demoUrl)}
                        className="lgr-embed"
                        loading="lazy"
                      />
                    </div>
                  </>
                ) : (
                  <p className="lgr-panel__muted">{t.noDemo}</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="lgr-modules" aria-label={t.accessTitle}>
            <ul className="lgr-module-grid">
              {COMPONENT_CATALOG.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="lgr-module"
                    onClick={() => setSelected(item)}
                  >
                    <span className="lgr-module__cat">
                      {categoryLabel(item, lang)}
                    </span>
                    <span className="lgr-module__title">
                      {titleLabel(item, lang)}
                    </span>
                    <span className="lgr-module__arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="lgr-footer" role="contentinfo">
        <p className="lgr-footer__line">{t.footer}</p>
        <p className="lgr-footer__note">{t.footerNote}</p>
      </footer>
    </div>
  );
};

export default BibliotecaOrigem;
