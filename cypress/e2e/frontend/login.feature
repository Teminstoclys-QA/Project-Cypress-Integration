# language: pt
@e2e @login
Funcionalidade: Login no front-end
  Como usuário do ServeRest
  Quero acessar o sistema com meu e-mail e senha
  Para utilizar as funcionalidades do meu perfil

  @smoke
  Cenário: Administrador acessa o painel com credenciais válidas
    Dado que existe um usuário administrador cadastrado
    Quando eu faço login pela tela com as credenciais do usuário
    Então devo ser direcionado para o painel do administrador

  Cenário: Exibir erro ao informar senha incorreta
    Dado que existe um usuário comum cadastrado
    Quando eu faço login pela tela com senha incorreta
    Então devo ver o alerta "Email e/ou senha inválidos"
    E devo permanecer na tela de login
