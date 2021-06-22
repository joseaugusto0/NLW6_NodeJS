# Estrutura do Database
Para que possar ser feito um banco de dados conciso, foi feito a seguinte estruturação do mesmo:

## Estrutura da tabela de usuários
-   ID (Primary key)
-   Nome (varchar)
-   Email (varchar)
-   Senha (varchar)
-   Admin (boolean)
-   criado_em (date)
-   atualizado_em (date)

## Estrutura da tabela de Tags
-   ID (Primary key)
-   Nome (varchar)  
-   criado_em (date)
-   atualizado_em (date)

## Estrutura da tabela de elogios
-   ID (Primary key)
-   Usuário que enviou - Foreign Key (uuid)
-   Usuário que recebeu - Foreign Key (uuid)
-   ID da tag - Foreign Key (uuid)
-   Mensagem (varchar)
-   criado_em (date)

