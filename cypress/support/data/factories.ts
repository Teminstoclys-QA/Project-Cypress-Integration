import { fakerPT_BR as faker } from '@faker-js/faker';

import type { Produto, Usuario } from '../types/serverest';

const sufixoUnico = (): string => `${Date.now().toString(36)}${faker.string.alphanumeric(4)}`;

export function criarUsuario(overrides: Partial<Usuario> = {}): Usuario {
  return {
    nome: faker.person.fullName(),
    email: `qa.${sufixoUnico()}@teste.com.br`.toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    administrador: 'false',
    ...overrides,
  };
}

export function criarProduto(overrides: Partial<Produto> = {}): Produto {
  return {
    nome: `${faker.commerce.productName()} ${sufixoUnico()}`,
    preco: faker.number.int({ min: 10, max: 5000 }),
    descricao: faker.commerce.productDescription().slice(0, 100),
    quantidade: faker.number.int({ min: 1, max: 500 }),
    ...overrides,
  };
}
