const { Anthropic } = require("@anthropic-ai/sdk")

let anthropic = undefined

exports.getAnthropic = () => {
  return anthropic
}

exports.initAnthropic = (key) => {
  anthropic = new Anthropic({ apiKey: key })
  console.log("connected to anthropic")
}

exports.askClaude = async (messages, model) => {
  console.log("messaging Claude: ", model)
  let messagesArray = messages

  if (anthropic === undefined) {
    throw new Error("Anthropic not connected")
  }
  const completion = await anthropic.messages.create({
    max_tokens: 1000,
    messages: messages,
    model: model,
  })
  const responseMessage = completion.content[0].text

  if (!responseMessage) {
    throw new Error("Did not receive the answer")
  }

  console.log(responseMessage)

  const formattedMessage = {
    role: "assistant",
    content: responseMessage,
  }

  messagesArray.push(formattedMessage)

  return messagesArray
}
