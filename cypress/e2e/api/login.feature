# language: pt
@api @login
Funcionalidade: Autenticação via API
  Como consumidor da API do ServeRest
  Quero me autenticar com e-mail e senha
  Para obter um token de acesso às rotas protegidas

  Contexto:
    Dado que existe um usuário comum cadastrado

  @smoke
  Cenário: Login com credenciais válidas retorna token Bearer
    Quando eu envio uma requisição de login com as credenciais do usuário
    Então o status code da resposta deve ser 200
    E a mensagem da resposta deve ser "Login realizado com sucesso"
    E o corpo da resposta deve seguir o contrato "login-sucesso"

  Esquema do Cenário: Login recusado com <situacao>
    Quando eu envio uma requisição de login com "<situacao>"
    Então o status code da resposta deve ser 401
    E a mensagem da resposta deve ser "Email e/ou senha inválidos"
    E o corpo da resposta deve seguir o contrato "mensagem-erro"

    Exemplos:
      | situacao              |
      | senha incorreta       |
      | e-mail não cadastrado |
