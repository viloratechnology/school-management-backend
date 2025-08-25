// const dialogflowService = require('../../Service/AiService/dialogflowService');


// exports.handleChatbotMessage = async (req, res) => {
//   const { message } = req.body;
//   console.log(req.body,"body")
//   try {
//     const reply = await dialogflowService.sendMessageToDialogflow(message); 
//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ reply: "Something went wrong. Try again later." });
//   }
// };

// chatbotController.js

const { sendMessageToDialogflow } = require('../../Service/AiService/dialogflowService'); // example import path
const chunkToData=require("../../Utilities/ChunksToData")

async function handleChatbotMessage(req, res) {
 
  try {
    
    let ans=await chunkToData.parseRequestBody(req)
    // const { message, userId, userType } = req.body; 
console.log(ans,"cont")
    if (!ans.message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Pass userId and userType along with the message
    const response = await sendMessageToDialogflow(ans.message, ans.userId,ans.userType);

    res.json({ reply: response });
  } catch (error) {
    console.error('Error in handleChatbotMessage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
            }
          


module.exports = {
  handleChatbotMessage,
};

