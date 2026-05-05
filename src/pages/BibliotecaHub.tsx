export const BibliotecaHub = () => {
  return (
    <div className="bib-page">
      <header className="bib-header" role="banner">
        <div className="bib-header__inner">
          <a className="bib-header__brand" href="#inicio">
            Biblioteca UI
          </a>
          <nav className="bib-header__nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#componentes">Componentes</a>
            <a href="#stack">Stack</a>
          </nav>
        </div>
      </header>

      <main className="bib-main">
        <section className="bib-hero" id="inicio" aria-labelledby="bib-hero-title">
          <div className="bib-hero__inner">
            <p className="bib-hero__badge">Biblioteca em construção</p>
            <h1 id="bib-hero-title" className="bib-hero__title">
              Acervo de componentes reutilizáveis, com foco em movimento e
              acessibilidade
            </h1>
            <p className="bib-hero__lead">
              Este repositório junta peças em <strong>HTML/CSS/JS</strong> na
              pasta <code>components/</code> e este hub em{" "}
              <strong>React + Vite</strong> para navegares no projeto. A demo
              completa do header e dos botões está na página estática indicada
              abaixo.
            </p>
            <p className="bib-hero__paths">
              Demo interativa (header fixo + menu mobile + Button 01): abre no
              browser o ficheiro{" "}
              <code>components/headers/header-01/index.html</code> — caminho
              relativo à raiz do projeto.
            </p>
          </div>
        </section>

        <section
          className="bib-section bib-section--surface"
          id="componentes"
          aria-labelledby="bib-sec-comp"
        >
          <div className="bib-section__inner">
            <h2 id="bib-sec-comp" className="bib-section__title">
              Estado da biblioteca
            </h2>
            <p className="bib-section__intro">
              Cada componente inclui README com uso, personalização e
              acessibilidade. Podes enviar a lista dos próximos blocos para
              irmos acrescentando aqui.
            </p>
            <ul className="bib-card-grid">
              <li className="bib-card">
                <span className="bib-card__tag">Headers</span>
                <h3 className="bib-card__name">Header 01</h3>
                <p className="bib-card__text">
                  Fixo, scroll, gaveta mobile, backdrop e teclado. Ver demo
                  estática.
                </p>
              </li>
              <li className="bib-card">
                <span className="bib-card__tag">Buttons</span>
                <h3 className="bib-card__name">Button 01</h3>
                <p className="bib-card__text">
                  Variantes primária e fantasma, partilhando tokens CSS com o
                  header.
                </p>
              </li>
              <li className="bib-card bib-card--soon">
                <span className="bib-card__tag">A seguir</span>
                <h3 className="bib-card__name">Os teus componentes</h3>
                <p className="bib-card__text">
                  Indica menus, cards, formulários ou microinterações — serão
                  criados no mesmo padrão.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="bib-section" id="stack" aria-labelledby="bib-sec-stack">
          <div className="bib-section__inner">
            <h2 id="bib-sec-stack" className="bib-section__title">
              Stack do repositório
            </h2>
            <p className="bib-section__intro">
              A pasta <code>components/</code> é agnóstica de framework. O app em{" "}
              <code>src/</code> serve para documentação viva e futuras previews;
              a demo vanilla do header não depende do <code>npm run dev</code>.
            </p>
          </div>
        </section>
      </main>

      <footer className="bib-footer" role="contentinfo">
        <div className="bib-footer__inner">
          <p className="bib-footer__brand">Biblioteca UI</p>
          <p className="bib-footer__note">
            Projeto local — usa esta página como índice e a demo em{" "}
            <code>components/headers/header-01/</code> para testar animações e
            menu hamburger.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BibliotecaHub;
