export const MENSAGENS = {
  login: {
    sucesso: 'Login realizado com sucesso',
    invalido: 'Email e/ou senha inválidos',
  },
  usuario: {
    cadastrado: 'Cadastro realizado com sucesso',
    emailDuplicado: 'Este email já está sendo usado',
    naoEncontrado: 'Usuário não encontrado',
    excluido: 'Registro excluído com sucesso',
  },
  produto: {
    cadastrado: 'Cadastro realizado com sucesso',
    nomeDuplicado: 'Já existe produto com esse nome',
    excluido: 'Registro excluído com sucesso',
  },
  auth: {
    tokenInvalido:
      'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
    rotaAdmin: 'Rota exclusiva para administradores',
  },
} as const;
