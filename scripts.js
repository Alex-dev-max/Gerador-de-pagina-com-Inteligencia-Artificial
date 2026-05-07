let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {


    let textarea = document.querySelector(".texto-pagina").value

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "user",
                    "content": textarea
                },
                {
                    "role": "system",
                    "content": "Você é um Programador. Você recebe uma tema de negócio e cria uma pagina com HTML e CSS. Responda apenas com código. A pagina é em Portugues do Brasil"
                }
            ],
        })
    })


   let dados = await resposta.json()
   let resultado = dados.choices[0].message.content

   let espacoCodigo = document.querySelector(".bloco-codigo")
   let espacoSite = document.querySelector(".bloco-site")

   espacoCodigo.textContent = resultado
   espacoSite.srcdoc = resultado
}