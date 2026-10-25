import { Then } from '@badeball/cypress-cucumber-preprocessor';

import { contexto, type RespostaHttp } from '../../context/cenario';
import { validarContrato } from '../../schemas';
import type { MensagemResponse } from '../../types/serverest';

function ultimaResposta(): RespostaHttp {
  const { resposta } = contexto.get();
  if (!resposta) {
    throw new Error('Nenhuma requisição foi feita neste cenário antes da validação.');
  }
  return resposta;
}

Then('o status code da resposta deve ser {int}', (statusEsperado: number) => {
  cy.then(() => {
    expect(ultimaResposta().status).to.equal(statusEsperado);
  });
});

Then('a mensagem da resposta deve ser {string}', (mensagemEsperada: string) => {
  cy.then(() => {
    expect((ultimaResposta().body as MensagemResponse).message).to.equal(mensagemEsperada);
  });
});

Then('o corpo da resposta deve seguir o contrato {string}', (nomeSchema: string) => {
  cy.then(() => {
    validarContrato(ultimaResposta().body, nomeSchema);
  });
});
