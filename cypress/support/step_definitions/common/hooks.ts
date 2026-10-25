import { After, Before } from '@badeball/cypress-cucumber-preprocessor';

import { limparMassaDeDados } from '../../actions/preCondicoes';
import { contexto } from '../../context/cenario';

Before({ name: 'Zerar contexto do cenário' }, () => {
  contexto.reset();
});

After({ name: 'Limpar massa de dados criada' }, () => {
  limparMassaDeDados();
});
