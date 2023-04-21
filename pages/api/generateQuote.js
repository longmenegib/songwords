import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-V5aBqqGFuhTfurCJCMW74MjY",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageListPrompt = [
    'the beauty of the natural world',
    'the feeling of love',
    'creativity and imagination',
    'hope and resilience',
    'sad life',
    'beautiful world',
    'univers in pretty dark'
]

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];

    return item;
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

const handler = async (req, res) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    //Preflight CORS handler
    if (req.method === "OPTIONS") {
        return res.status(200).json({
            body: "OK",
        });
    }
    const requestMethod = req.method;

    switch (requestMethod) {
        case 'POST':
            if (req.body.title !== undefined && req.body.artist !== undefined) {
                let prompt = `Please generate a short motivational quote from the song '${req.body.title}' by ${req.body.artist}`
                const completion = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: prompt,
                    temperature: .7,
                    max_tokens: 2048,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: ["{}"],
                });

                const response = await openai.createImage({
                    prompt: getRandomItem(imageListPrompt),
                    n: 1,
                    size: '512x512',
                });
                res.status(200).json({ completion: completion.data.choices[0].text.trim().replace(/\\/g, '').replace(/^"(.*)"$/, '$1'), response: response.data.data[0].url, success: true });
            }
            else {
                res.status(200).json({ text: "I don't have access to the lyrics of that song yet", success: false });
            }
            break;
        default:
            res.status(200).json({ message: 'Access accepted', success: true })
    }
}

export default handler;