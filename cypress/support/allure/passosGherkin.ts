const NEGRITO = /^\*\*([\s\S]*)\*\*$/;

const logOriginal = Cypress.log.bind(Cypress);

Cypress.log = ((opcoes: Partial<Cypress.LogConfig> & { groupStart?: boolean }) => {
  if (opcoes?.groupStart && typeof opcoes.message === 'string') {
    const texto = NEGRITO.exec(opcoes.message);
    if (texto) return logOriginal({ ...opcoes, message: texto[1] });
  }
  return logOriginal(opcoes);
}) as typeof Cypress.log;
