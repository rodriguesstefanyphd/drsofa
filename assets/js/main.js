/* Doutor Sofá — Unidade Lisboa */
(function () {
  'use strict';

  /* Número de WhatsApp da unidade, no formato internacional sem "+". */
  var WHATSAPP = '351000000000';

  /* ---------------------------------------------------- menu mobile ---- */
  var toggle = document.querySelector('.nav__toggle');
  var menu   = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------- ano no rodapé -- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = String(new Date().getFullYear()); }

  /* ---------------------------------------------------- formulário ----- */
  var form = document.getElementById('form-orcamento');
  if (!form) { return; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var invalido = false;
    Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (campo) {
      var vazio = !campo.value.trim();
      campo.setAttribute('aria-invalid', String(vazio));
      if (vazio && !invalido) { campo.focus(); invalido = true; }
    });
    if (invalido) { return; }

    var d = new FormData(form);
    var linhas = [
      'Olá! Gostaria de um orçamento — Doutor Sofá Lisboa.',
      '',
      'Nome: ' + d.get('nome'),
      'Telemóvel: ' + d.get('telefone'),
      'Zona: ' + d.get('zona'),
      'Serviço: ' + d.get('servico')
    ];

    var detalhes = (d.get('detalhes') || '').toString().trim();
    if (detalhes) { linhas.push('Detalhes: ' + detalhes); }

    window.open(
      'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n')),
      '_blank',
      'noopener'
    );
  });
}());
