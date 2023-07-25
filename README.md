🌟 API do Discord - Informações de Usuário 🌟

Este repositório contém uma incrível API construída com o framework Express para fornecer informações detalhadas sobre usuários do Discord! 😎

🚀 Como executar o código

Certifique-se de ter o Node.js instalado em seu computador. Você pode baixá-lo em 🌐 https://nodejs.org/.

Clone este repositório em sua máquina local ou baixe-o como arquivo ZIP.

Abra um terminal ou prompt de comando e navegue até o diretório onde o código está localizado.

Instale as dependências necessárias executando o seguinte comando: 💻

Copy code
npm install
Configure as URLs dos webhooks e o token de uma conta do Discord válida no código. Substitua as seguintes variáveis de acordo:
javascript
Copy code
const avatarWebhookUrl = "url_para_o_webhook_de_avatares";
const bannerWebhookUrl = "url_para_o_webhook_de_banners";
const TOKEN = "token_da_sua_conta_do_discord";
Após fazer as alterações, execute o servidor com o seguinte comando: 🚀
Copy code
node app.js
O servidor estará em execução na porta 3000. Agora, você pode acessar a API através de seu navegador ou ferramenta de teste de API.
🔍 Endpoints da API

GET /: Um endpoint raiz que retorna uma mensagem de boas-vindas e menciona a existência de um iplogger para todos que acessam a API. 👋

GET /id/:id: Este endpoint recebe um ID de usuário do Discord como parâmetro (substitua ":id" pelo ID do usuário desejado) e retorna informações sobre o usuário correspondente, incluindo o nome de usuário, o URL do avatar, o URL do banner, o discriminador, os distintivos públicos, o status do Nitro, a cor de destaque e os distintivos especiais que o usuário possui. 📜

POST /send-assets: Este endpoint recebe um payload JSON com as URLs do avatar e do banner e envia-as para os webhooks específicos. Certifique-se de enviar o payload no formato JSON adequado: 📤

json
Copy code
{
  "avatarUrl": "url_do_avatar",
  "bannerUrl": "url_do_banner"
}
✨ Observações Importantes

Lembre-se de tratar o armazenamento do token de autenticação de forma segura, pois o acesso a esse token pode conceder controle total sobre a conta do Discord associada. 🔐

Certifique-se de ter permissão para usar os webhooks fornecidos nas URLs antes de executar a funcionalidade de envio de ativos. 📢

Este código é apenas um exemplo e pode ser aprimorado para atender a requisitos específicos e adicionar medidas de segurança adicionais, dependendo do caso de uso real. 🛡️

Divirta-se explorando a API e fique à vontade para personalizar e expandir esse projeto incrível! 🎉😃
