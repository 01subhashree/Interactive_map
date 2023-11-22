const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "your apiKey",
});

app.post("/locations", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        //6. Define the role of the system message and its content.
        {
          role: "system",
          content:
            "You only return in JSON a coordinates key with a value in this format [43.6426, -79.3871], then a title of the location with a title key, some detail about the place with a description key from user input and zoom key with some numeric value ",
        },
        //7. Capture user's request from req.body.
        { role: "user", content: req.body.value },
      ],
    });

    // console.log("fetchdata", completion.choices[0].message?.content);
    // 8. Extract content from the chat completion response.
    const responseText = completion.choices[0]?.message?.content;
    //9. Check if the content is valid JSON.
    if (responseText && responseText[0] === "{") {
      //   //10. Parse the content to JSON.
      const json = JSON.parse(responseText);
      //   //11. Respond with a 200 status and parsed JSON.
      res.status(200).json(json);
      //   //12. Log the JSON to console.
      // console.log(json);
    } else {
      //   //13. Respond with a 200 status and a tryAgain flag if the content is not valid JSON.
      res.status(200).json({ tryAgain: true });
    }
  } catch (error) {
    //14. Handle any errors by responding with a 500 status and the error.
    res.status(500).json({ error });
    console.log(error);
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
