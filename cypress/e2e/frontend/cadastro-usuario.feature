# language: pt
@e2e @usuarios
Funcionalidade: Cadastro de usuário no front-end
  Como visitante do ServeRest
  Quero criar minha conta pela tela de cadastro
  Para poder comprar na loja

  @smoke
  Cenário: Visitante cria conta de usuário comum
    Dado que estou na tela de cadastro de usuários
    Quando eu preencho o cadastro com dados válidos e confirmo
    Então o cadastro deve ser concluído com sucesso
    E devo ser direcionado para a loja

  Cenário: Exibir erro ao cadastrar e-mail já utilizado
    Dado que existe um usuário comum cadastrado
    E que estou na tela de cadastro de usuários
    Quando eu preencho o cadastro com o mesmo e-mail e confirmo
    Então devo ver o alerta "Este email já está sendo usado"
