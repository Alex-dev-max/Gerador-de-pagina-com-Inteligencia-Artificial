let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

function removerCodeFence(texto) {
    if (!texto) return ""
    let resultado = texto.trim()

    const fenceRegex = /^```(?:html|htm|css)?\n([\s\S]*)```$/i
    const match = resultado.match(fenceRegex)
    if (match) {
        resultado = match[1].trim()
    }

    return resultado
}

async function gerarCodigo() {
    const textarea = document.querySelector(".texto-pagina").value.trim()
    if (!textarea) {
        alert("Por favor, descreva seu negócio antes de gerar a página.")
        return
    }

    const resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${chave}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de sites. Crie uma página HTML completa e válida com CSS interno e imagens externas de alta qualidade. O site deve ser moderno, chamativo e conter várias seções: hero com chamada forte, serviços ou produtos, diferenciais, depoimentos ou avaliações, chamada para ação e rodapé. Use cores vibrantes, tipografia atraente e conteúdo textual persuasivo em Português do Brasil. Responda apenas com o código HTML completo, sem explicações."
                },
                {
                    role: "user",
                    content: `Transforme este texto em um site completo, bonito e muito chamativo com HTML/CSS, imagens externas e conteúdo relevante: ${textarea}`
                }
            ]
        })
    })

    const dados = await resposta.json()
    const conteudoBruto = dados?.choices?.[0]?.message?.content || ""
    const resultado = removerCodeFence(conteudoBruto)

    const espacoCodigo = document.querySelector(".bloco-codigo")
    const espacoSite = document.querySelector(".bloco-site")

    espacoCodigo.textContent = resultado
    espacoSite.srcdoc = resultado
}