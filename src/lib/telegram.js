const {botToken, chatId} = require("../../config.json")

export async function sendMessage(amount, event){
    const res = await fetch(`https://api.telegram.org/${botToken}/sendMessage?chat_id=${chatId}&text=Expected an Amount received of Rs. ${amount} of Event ID \`${event}\`&parse_mode=Markdown`, {method: "GET"})
    const json = await res.json()
    console.log(json)
}