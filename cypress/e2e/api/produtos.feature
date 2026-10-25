# language: pt
@api @produtos
Funcionalidade: Cadastro de produtos via API
  Como administrador da loja
  Quero cadastrar produtos pela API
  Para disponibilizá-los aos clientes

  @smoke
  Cenário: Administrador cadastra produto com sucesso
    Dado que estou autenticado na API como administrador
    Quando eu cadastro um novo produto via API
    Então o status code da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve seguir o contrato "cadastro-sucesso"

  Cenário: Não permitir cadastro de produto sem token de acesso
    Quando eu cadastro um novo produto via API sem token
    Então o status code da resposta deve ser 401
    E a mensagem da resposta deve ser "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"

  Cenário: Não permitir que usuário comum cadastre produto
    Dado que estou autenticado na API como usuário comum
    Quando eu cadastro um novo produto via API
    Então o status code da resposta deve ser 403
    E a mensagem da resposta deve ser "Rota exclusiva para administradores"
