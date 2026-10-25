import { Given } from '@badeball/cypress-cucumber-preprocessor';

import { criarUsuarioViaApi } from '../../actions/preCondicoes';

Given('que existe um usuário comum cadastrado', () => {
  criarUsuarioViaApi({ administrador: 'false' });
});

Given('que existe um usuário administrador cadastrado', () => {
  criarUsuarioViaApi({ administrador: 'true' });
});
