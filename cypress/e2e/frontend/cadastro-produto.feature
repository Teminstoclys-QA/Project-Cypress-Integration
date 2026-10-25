# language: pt
@e2e @produtos
Funcionalidade: Cadastro de produto no front-end
  Como administrador da loja
  Quero cadastrar produtos pelo painel
  Para disponibilizá-los aos clientes

  Contexto:
    Dado que estou logado no front como administrador
    E que estou na tela de cadastro de produtos

  @smoke
  Cenário: Administrador cadastra produto e o visualiza na listagem
    Quando eu preencho o cadastro de produto com dados válidos e confirmo
    Então o produto deve aparecer na listagem de produtos

  Cenário: Exibir erro ao cadastrar produto com nome já existente
    Dado que já existe um produto cadastrado via API
    Quando eu preencho o cadastro de produto com o mesmo nome e confirmo
    Então devo ver o alerta "Já existe produto com esse nome"
