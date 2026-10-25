import { When } from '@badeball/cypress-cucumber-preprocessor';

import { credenciaisDe } from '../../actions/preCondicoes';
import { contexto } from '../../context/cenario';
import { criarUsuario } from '../../data/factories';
import { loginService } from '../../services/LoginService';
import type { Credenciais } from '../../types/serverest';

function enviarLogin(credenciais: Credenciais): void {
  loginService.login(credenciais).then((resposta) => {
    contexto.get().resposta = resposta;
  });
}

When('eu envio uma requisição de login com as credenciais do usuário', () => {
  cy.then(() => enviarLogin(credenciaisDe(contexto.get().usuario!)));
});

When('eu envio uma requisição de login com {string}', (situacao: string) => {
  cy.then(() => {
    const usuario = contexto.get().usuario!;

    const variacoes: Record<string, Credenciais> = {
      'senha incorreta': { email: usuario.email, password: `${usuario.password}-errada` },
      'e-mail não cadastrado': { email: criarUsuario().email, password: usuario.password },
    };

    const credenciais = variacoes[situacao];
    if (!credenciais) {
      throw new Error(`Situação de login não mapeada: "${situacao}"`);
    }

    enviarLogin(credenciais);
  });
});
