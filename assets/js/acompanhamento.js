/* ============================================================
   ACOMPANHAMENTO.JS — Lógica da consulta de protocolo
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const btnConsultar  = document.getElementById('btn-consultar');
  const inputProtocolo = document.getElementById('protocolo');
  const inputEmail    = document.getElementById('email');
  const areaResultado = document.getElementById('resultado');

  // Permite consultar também pressionando Enter nos inputs
  [inputProtocolo, inputEmail].forEach(input => {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') consultar();
    });
  });

  btnConsultar.addEventListener('click', consultar);

  function consultar() {
    const protocolo = inputProtocolo.value.trim();
    const email     = inputEmail.value.trim().toLowerCase();

    if (!protocolo || !email) {
      mostrarErro('Preencha o número do protocolo e o e-mail.');
      return;
    }

    const banco = JSON.parse(localStorage.getItem('reclamacoes')) || [];

    // Busca ignorando maiúsculas no e-mail
    const encontrado = banco.find(r =>
      String(r.protocolo) === protocolo &&
      r.email.toLowerCase() === email
    );

    if (encontrado) {
      mostrarResultado(encontrado);
    } else {
      mostrarErro('Nenhuma reclamação encontrada com esses dados. Verifique o protocolo e o e-mail.');
    }
  }

  function statusClasse(status) {
    const mapa = {
      'Em análise': 'analise',
      'Resolvido':  'resolvido',
      'Rejeitado':  'rejeitado'
    };
    return mapa[status] || 'analise';
  }

  function mostrarResultado(r) {
    areaResultado.innerHTML = `
      <div class="resultado-dados">
        <div class="dado-linha">
          <span class="rotulo">Protocolo</span>
          <span class="valor">#${r.protocolo}</span>
        </div>
        <div class="dado-linha">
          <span class="rotulo">Tipo de problema</span>
          <span class="valor">${r.tipo}</span>
        </div>
        <div class="dado-linha">
          <span class="rotulo">Endereço</span>
          <span class="valor">${r.endereco || '—'}</span>
        </div>
        <div class="dado-linha">
          <span class="rotulo">Status</span>
          <span class="valor">
            <span class="badge-status ${statusClasse(r.status)}">${r.status}</span>
          </span>
        </div>
        <div class="dado-linha">
          <span class="rotulo">Data</span>
          <span class="valor">${r.data}</span>
        </div>
      </div>
    `;
  }

  function mostrarErro(msg) {
    areaResultado.innerHTML = `<div class="resultado-erro">⚠️ ${msg}</div>`;
  }
});
