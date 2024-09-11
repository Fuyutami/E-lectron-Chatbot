const OpenAI = require("openai")

let openai = undefined

exports.getOpenAI = () => {
  return openai
}

exports.initOpenAI = (key) => {
  openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })
  console.log("connected to openAI")
}

exports.askGPT = async (messages, model) => {
  console.log("messaging GPT: ", model)
  let messagesArray = messages

  if (openai === undefined) {
    throw new Error("OpenAI not connected")
  }
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: model,
  })
  const responseMessage = completion.choices[0].message

  if (!responseMessage) {
    throw new Error("Did not receive the answer")
  }

  messagesArray.push(responseMessage)

  return messagesArray
}

exports.askDalle = async (messages, model) => {
  console.log("messaging DALL-E: ", model)
  let messagesArray = messages

  if (openai === undefined) {
    throw new Error("OpenAI not connected")
  }

  const promt = [...messagesArray].pop().content

  const image = await openai.images.generate({
    prompt: promt,
    model: model,
  })

  console.log(image.data)
  const image_url = image.data[0].url

  console.log(image_url)

  const responseMessage = {
    role: "assistant",
    content: image_url,
  }

  messagesArray.push(responseMessage)

  return messagesArray
}
