/* Doutor Sofá — Unidade Lisboa */
(function () {
  'use strict';

  /* Número de WhatsApp da unidade, formato internacional sem "+".
     Os links .js-wa no HTML já apontam para este número; alterar aqui
     mantém o formulário e os botões coerentes. */
  var WHATSAPP = '351000000000';

  /* Ano corrente no rodapé. */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = String(new Date().getFullYear()); }

  /* Formulário: valida e abre o WhatsApp com a mensagem preenchida. */
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
      'Olá, preciso de um orçamento — Doutor Sofá Lisboa.',
      '',
      'Nome: ' + d.get('nome'),
      'Telemóvel: ' + d.get('telemovel'),
      'Serviço: ' + d.get('servico')
    ];

    var descricao = (d.get('descricao') || '').toString().trim();
    if (descricao) { linhas.push('Descrição: ' + descricao); }

    window.open(
      'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n')),
      '_blank',
      'noopener'
    );
  });
}());
