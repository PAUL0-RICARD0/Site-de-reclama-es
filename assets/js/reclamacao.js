/* ============================================================
   RECLAMACAO.JS — Lógica do formulário de registro
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const form        = document.getElementById('form-reclamacao');
  const tipoSelect  = document.getElementById('tipo');
  const campoOutro  = document.getElementById('campo-outro');
  const tipoOutro   = document.getElementById('tipo-outro');
  const modal       = document.getElementById('modal-protocolo');
  const numProtocol = document.getElementById('protocolo-numero');
  const btnFechar   = document.querySelectorAll('[data-fechar-modal]');

  // --- Campo "Outro" com animação suave ---
  tipoSelect.addEventListener('change', function () {
    const ehOutro = this.value === 'Outro';
    campoOutro.classList.toggle('visivel', ehOutro);
    tipoOutro.required = ehOutro;
    if (!ehOutro) tipoOutro.value = '';
  });

  // --- Abrir / Fechar modal ---
  function abrirModal(protocolo) {
    numProtocol.textContent = protocolo;
    modal.classList.add('visivel');
    modal.setAttribute('aria-hidden', 'false');
  }

  function fecharModal() {
    modal.classList.remove('visivel');
    modal.setAttribute('aria-hidden', 'true');
  }

  btnFechar.forEach(btn => btn.addEventListener('click', fecharModal));
  modal.addEventListener('click', function (e) {
    if (e.target === modal) fecharModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharModal();
  });

  // --- Gera protocolo com 6 dígitos (ex: 047382) ---
  function gerarProtocolo() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  }

  // --- Envio do formulário ---
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btnSubmit = form.querySelector('.btn-submit');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando…';

    // Coleta os dados
    let tipo = tipoSelect.value;
    if (tipo === 'Outro' && tipoOutro.value.trim()) {
      tipo = tipoOutro.value.trim();
    }

    const reclamacao = {
      protocolo:  gerarProtocolo(),
      tipo:       tipo,
      endereco:   document.getElementById('endereco').value.trim(),
      descricao:  document.getElementById('descricao').value.trim(),
      nome:       document.getElementById('nome').value.trim(),
      email:      document.getElementById('email').value.trim(),
      status:     'Em análise',
      data:       new Date().toLocaleDateString('pt-BR')
    };

    // Salva no localStorage
    const banco = JSON.parse(localStorage.getItem('reclamacoes')) || [];
    banco.push(reclamacao);
    localStorage.setItem('reclamacoes', JSON.stringify(banco));

    // Feedback visual leve antes de mostrar modal
    setTimeout(() => {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Enviar Reclamação';
      abrirModal(reclamacao.protocolo);
      form.reset();
      campoOutro.classList.remove('visivel');
    }, 600);
  });
});
