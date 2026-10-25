# language: pt
@api @usuarios
Funcionalidade: Cadastro de usuários via API
  Como consumidor da API do ServeRest
  Quero cadastrar usuários
  Para que eles possam acessar a loja

  @smoke
  Cenário: Cadastrar usuário com dados válidos
    Quando eu cadastro um novo usuário via API
    Então o status code da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve seguir o contrato "cadastro-sucesso"
    E o usuário deve estar disponível na consulta por ID com os dados enviados

  Cenário: Não permitir cadastro com e-mail já utilizado
    Dado que existe um usuário comum cadastrado
    Quando eu cadastro um novo usuário via API com o mesmo e-mail
    Então o status code da resposta deve ser 400
    E a mensagem da resposta deve ser "Este email já está sendo usado"
    E o corpo da resposta deve seguir o contrato "mensagem-erro"
