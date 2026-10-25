import Ajv from 'ajv';

import cadastroSucesso from './cadastro-sucesso.schema.json';
import loginSucesso from './login-sucesso.schema.json';
import mensagemErro from './mensagem-erro.schema.json';
import usuario from './usuario.schema.json';

const SCHEMAS = {
  'login-sucesso': loginSucesso,
  'cadastro-sucesso': cadastroSucesso,
  usuario,
  'mensagem-erro': mensagemErro,
} as const;

export type NomeSchema = keyof typeof SCHEMAS;

const ajv = new Ajv({ allErrors: true });

export function validarContrato(body: unknown, nome: string): void {
  if (!(nome in SCHEMAS)) {
    throw new Error(
      `Schema "${nome}" não registrado. Disponíveis: ${Object.keys(SCHEMAS).join(', ')}`,
    );
  }

  const validar = ajv.getSchema(nome) ?? ajv.compile(SCHEMAS[nome as NomeSchema]);
  const valido = validar(body);

  expect(valido, `Contrato "${nome}" inválido: ${ajv.errorsText(validar.errors)}`).to.equal(true);
}
