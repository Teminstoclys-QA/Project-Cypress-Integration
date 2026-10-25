import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { contexto } from '../../context/cenario';
import { criarUsuario } from '../../data/factories';
import { validarContrato } from '../../schemas';
import { usuariosService } from '../../services/UsuariosService';
import type { Usuario } from '../../types/serverest';

function cadastrar(usuario: Usuario): void {
  usuariosService.cadastrar(usuario).then((resposta) => {
    contexto.get().resposta = resposta;

    if (resposta.status === 201) {
      contexto.registrarUsuario(resposta.body._id);
      contexto.get().usuario = { ...usuario, _id: resposta.body._id };
    }
  });
}

When('eu cadastro um novo usuário via API', () => {
  cadastrar(criarUsuario());
});

When('eu cadastro um novo usuário via API com o mesmo e-mail', () => {
  cy.then(() => cadastrar(criarUsuario({ email: contexto.get().usuario!.email })));
});

Then('o usuário deve estar disponível na consulta por ID com os dados enviados', () => {
  cy.then(() => {
    const { _id, ...enviado } = contexto.get().usuario!;

    usuariosService.buscarPorId(_id!).then((resposta) => {
      expect(resposta.status).to.equal(200);
      validarContrato(resposta.body, 'usuario');
      expect(resposta.body).to.include({ ...enviado, _id });
    });
  });
});
