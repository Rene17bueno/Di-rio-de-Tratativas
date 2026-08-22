// Navegação única do site (PainelOT). Editar aqui reflete em TODAS as páginas —
// esse é o único lugar que define os itens do menu, pra não precisar mais
// repetir/alterar o mesmo <nav> em 11 arquivos diferentes.
//
// Uso em cada página:
//   <div id="navHost"></div>
//   <script src="nav-shared.js"></script>
//   <script>montarNavegacao('chaveDaPaginaAtiva', 'chaveDoItemDoDropdownAtivo (opcional)');</script>
(function () {
  // Estilo da aba secundária (sub-navegação) — injetado uma vez, pra não
  // precisar repetir esse CSS no <style> de cada página.
  const ESTILO_SUBNAV = document.createElement('style');
  ESTILO_SUBNAV.textContent = `
    .subnav-strip {
      display: flex; align-items: center; gap: .5rem;
      background: var(--surface-0, #fff); border: 1px solid var(--border-soft, #e3e8f0);
      border-radius: var(--radius-md, .7rem); padding: .4rem;
      overflow-x: auto;
    }
    .subnav-hub {
      flex-shrink: 0; width: 32px; height: 32px; border-radius: var(--radius-sm, .5rem);
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--surface-1, #e9edf4); color: var(--ink-500, #667085);
      text-decoration: none; transition: background .15s, color .15s;
    }
    .subnav-hub:hover { background: var(--brand-50, #eef4ff); color: var(--brand-600, #1c4aa8); }
    .subnav-links { display: flex; flex-wrap: wrap; gap: .3rem; }
    .subnav-link {
      flex-shrink: 0; font-size: .82rem; font-weight: 600; text-decoration: none;
      color: var(--ink-700, #344054); padding: .4rem .75rem; border-radius: var(--radius-sm, .5rem);
      transition: background .15s, color .15s;
    }
    .subnav-link:hover { background: var(--brand-50, #eef4ff); color: var(--brand-700, #163a85); }
    .subnav-link.active { background: var(--brand-500, #245bc7); color: #fff; }
  `;
  document.head.appendChild(ESTILO_SUBNAV);

  const NAV_HTML = `
    <nav class="navbar navbar-expand-lg navbar-site px-3 py-2 mb-2">
      <div class="container-fluid px-0">
        <a class="navbar-brand" href="index.html">
          <span class="brand-mark"><i class="bi bi-grid-1x2-fill"></i></span>
          <span class="brand-text"><span class="sub">Painel</span>OT</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menuPrincipal">
          <ul class="navbar-nav ms-auto gap-1 align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link" data-nav="home" href="index.html"><i class="bi bi-house-door-fill me-1"></i>Início</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-nav="tratativas" href="tratativas.html"><i class="bi bi-journal-richtext me-1"></i>Tratativas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-nav="geo" href="tratativageo.html"><i class="bi bi-geo-alt-fill me-1"></i>Geolocalizador</a>
            </li>
            <li class="nav-item dropdown" data-nav-group="importacao">
              <a class="nav-link dropdown-toggle" href="importacao.html" id="menuImportacao" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-cloud-arrow-up-fill me-1"></i>Importação de Dados
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuImportacao">
                <li><a class="dropdown-item" href="importacao.html"><i class="bi bi-house-door"></i>Visão geral da importação</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" data-nav-item="base" href="tratamento-dados.html"><i class="bi bi-truck"></i>Tratamento de Base</a></li>
                <li><a class="dropdown-item" data-nav-item="2art" href="tratamento-2art.html"><i class="bi bi-files"></i>Base 2art</a></li>
                <li><a class="dropdown-item" data-nav-item="clientes" href="tratamento-clientes.html"><i class="bi bi-people-fill"></i>Base de Clientes</a></li>
                <li><a class="dropdown-item" data-nav-item="carregamento" href="tratamento-carregamento.html"><i class="bi bi-truck-flatbed"></i>Carregamento / Lacre</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown" data-nav-group="consultas">
              <a class="nav-link dropdown-toggle" href="consultas.html" id="menuAnalises" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-graph-up-arrow me-1"></i>Consultas &amp; Análises
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuAnalises">
                <li><a class="dropdown-item" href="consultas.html"><i class="bi bi-house-door"></i>Visão geral das consultas</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" data-nav-item="analise" href="analise.html"><i class="bi bi-layout-text-window-reverse"></i>Análise</a></li>
                <li><a class="dropdown-item" data-nav-item="mapa" href="consulta-mapa.html"><i class="bi bi-signpost-2-fill"></i>Consulta por Mapa</a></li>
                <li><a class="dropdown-item" data-nav-item="vinculo" href="vinculo-tabelas.html"><i class="bi bi-link-45deg"></i>Vínculo de Tabelas</a></li>
                <li><a class="dropdown-item" data-nav-item="ranking" href="ranking-estouro.html"><i class="bi bi-graph-up-arrow"></i>Ranking de Estouro</a></li>
                <li><a class="dropdown-item" data-nav-item="diaria" href="analise-diaria.html"><i class="bi bi-clipboard2-pulse-fill"></i>Análise Diária</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown" data-nav-group="relatorios">
              <a class="nav-link dropdown-toggle" href="relatorios.html" id="menuRelatorios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-calendar3-range me-1"></i>Relatórios
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuRelatorios">
                <li><a class="dropdown-item" data-nav-item="diario" href="relatorios.html#diario"><i class="bi bi-calendar-day"></i>Relatório Diário</a></li>
                <li><a class="dropdown-item" data-nav-item="semanal" href="relatorios.html#semanal"><i class="bi bi-calendar-week"></i>Relatório Semanal</a></li>
                <li><a class="dropdown-item" data-nav-item="mensal" href="relatorios.html#mensal"><i class="bi bi-calendar-month"></i>Relatório Mensal</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Grupos usados pela sub-navegação (aba secundária) dentro de cada seção.
  const GRUPOS = {
    importacao: {
      titulo: 'Importação de Dados',
      hub: 'importacao.html',
      itens: [
        { chave: 'base',          rotulo: 'Tratamento de Base',   icone: 'bi-truck',          href: 'tratamento-dados.html' },
        { chave: '2art',          rotulo: 'Base 2art',            icone: 'bi-files',           href: 'tratamento-2art.html' },
        { chave: 'clientes',      rotulo: 'Base de Clientes',     icone: 'bi-people-fill',     href: 'tratamento-clientes.html' },
        { chave: 'carregamento',  rotulo: 'Carregamento / Lacre', icone: 'bi-truck-flatbed',   href: 'tratamento-carregamento.html' },
      ],
    },
    consultas: {
      titulo: 'Consultas & Análises',
      hub: 'consultas.html',
      itens: [
        { chave: 'analise',  rotulo: 'Análise',              icone: 'bi-layout-text-window-reverse', href: 'analise.html' },
        { chave: 'mapa',     rotulo: 'Consulta por Mapa',    icone: 'bi-signpost-2-fill',            href: 'consulta-mapa.html' },
        { chave: 'vinculo',  rotulo: 'Vínculo de Tabelas',   icone: 'bi-link-45deg',                 href: 'vinculo-tabelas.html' },
        { chave: 'ranking',  rotulo: 'Ranking de Estouro',   icone: 'bi-graph-up-arrow',             href: 'ranking-estouro.html' },
        { chave: 'diaria',   rotulo: 'Análise Diária',       icone: 'bi-clipboard2-pulse-fill',      href: 'analise-diaria.html' },
      ],
    },
  };

  // Aba secundária: reforça em qual seção a pessoa está e deixa trocar entre
  // as páginas irmãs sem precisar voltar pro hub da seção.
  window.montarSubNav = function (grupoChave, itemAtivo) {
    const host = document.getElementById('subNavHost');
    const grupo = GRUPOS[grupoChave];
    if (!host || !grupo) return;

    const abas = grupo.itens.map(item => `
      <a class="subnav-link${item.chave === itemAtivo ? ' active' : ''}" href="${item.href}">
        <i class="bi ${item.icone} me-1"></i>${item.rotulo}
      </a>
    `).join('');

    host.innerHTML = `
      <div class="subnav-strip mb-3">
        <a class="subnav-hub" href="${grupo.hub}" title="Visão geral de ${grupo.titulo}"><i class="bi bi-grid-3x3-gap-fill"></i></a>
        <div class="subnav-links">${abas}</div>
      </div>
    `;
  };

  window.montarNavegacao = function (paginaAtiva, itemAtivo) {
    const host = document.getElementById('navHost');
    if (!host) return;
    host.innerHTML = NAV_HTML;

    // marca o link de topo ativo (Início / Tratativas / Geolocalizador)
    const linkTopo = host.querySelector(`.nav-link[data-nav="${paginaAtiva}"]`);
    if (linkTopo) {
      linkTopo.classList.add('active');
      linkTopo.setAttribute('aria-current', 'page');
    }

    // marca o grupo do dropdown (Importação / Consultas / Relatórios) ativo
    const grupo = host.querySelector(`.nav-item.dropdown[data-nav-group="${paginaAtiva}"]`);
    if (grupo) {
      grupo.classList.add('section-active');
      if (itemAtivo) {
        const itemDropdown = grupo.querySelector(`.dropdown-item[data-nav-item="${itemAtivo}"]`);
        if (itemDropdown) {
          itemDropdown.classList.add('active');
          itemDropdown.setAttribute('aria-current', 'page');
        }
      }
    }
  };
})();
