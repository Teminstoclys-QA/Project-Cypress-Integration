import { contexto } from '../context/cenario';
import { criarUsuario } from '../data/factories';
import { loginService } from '../services/LoginService';
import { produtosService } from '../services/ProdutosService';
import { usuariosService } from '../services/UsuariosService';
import type { Credenciais, Usuario, UsuarioCadastrado } from '../types/serverest';

/** O POST /login rejeita campos além de email e password. */
export const credenciaisDe = ({ email, password }: Credenciais): Credenciais => ({
  email,
  password,
});

export function criarUsuarioViaApi(
  overrides: Partial<Usuario> = {},
): Cypress.Chainable<UsuarioCadastrado> {
  const usuario = criarUsuario(overrides);

  return usuariosService.cadastrar(usuario).then((resposta) => {
    expect(resposta.status, 'pré-condição: cadastro do usuário via API').to.equal(201);

    const usuarioCriado: UsuarioCadastrado = { ...usuario, _id: resposta.body._id };
    contexto.registrarUsuario(usuarioCriado._id);
    contexto.get().usuario = usuarioCriado;

    return usuarioCriado;
  });
}

export function obterTokenViaApi(credenciais: Credenciais): Cypress.Chainable<string> {
  return loginService.login(credenciaisDe(credenciais)).then((resposta) => {
    expect(resposta.status, 'pré-condição: login via API').to.equal(200);

    contexto.get().token = resposta.body.authorization;
    return resposta.body.authorization;
  });
}

/** Remove a massa do cenário. Produtos primeiro, pois a exclusão exige o token do administrador. */
export function limparMassaDeDados(): void {
  const { criados, usuario, token } = contexto.get();

  if (criados.produtos.length > 0 && usuario) {
    const comToken = token
      ? cy.wrap(token, { log: false })
      : loginService.login(credenciaisDe(usuario)).then((r) => r.body.authorization);

    comToken.then((tokenAdmin) => {
      criados.produtos.forEach((id) => {
        produtosService.excluir(id, tokenAdmin).then((r) => {
          if (r.status !== 200) cy.log(`Limpeza: produto ${id} não removido (${r.status})`);
        });
      });
    });
  }

  criados.usuarios.forEach((id) => {
    usuariosService.excluir(id).then((r) => {
      if (r.status !== 200) cy.log(`Limpeza: usuário ${id} não removido (${r.status})`);
    });
  });
}
