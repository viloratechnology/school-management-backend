// const dialogflow = require('@google-cloud/dialogflow');
// const uuid = require('uuid');

// require('dotenv').config();

// const projectId = process.env.DIALOGFLOW_PROJECT_ID;
// const sessionId = process.env.DIALOGFLOW_SESSION_ID || uuid.v4();
// const languageCode = process.env.DIALOGFLOW_LANGUAGE || 'en-US';

// const sessionClient = new dialogflow.SessionsClient({
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
//  });

// async function sendMessageToDialogflow(message) {
//   const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: message,
//         languageCode: languageCode,
//       },
//     },
//   };

//   const responses = await sessionClient.detectIntent(request);
//   const result = responses[0].queryResult;

//   console.log("Intent Detected:", result.intent.displayName);
//   console.log("Query Text:", result.queryText);
//   console.log("Response:", result.fulfillmentText);
//   console.log("Confidence:", result.intentDetectionConfidence);

//   if (result.intent.displayName === 'Default Fallback Intent') {
//     return "I'm not sure I understand that yet. Can you try asking in a different way?";
//   }

//   return result.fulfillmentText || "Hmm, I didn't get that. Try rephrasing it.";
// }


// module.exports = { sendMessageToDialogflow };
require('dotenv').config();
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const chatbotDataService = require('../AiService/chatbotDataService'); // We'll create this


const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESSION_ID || uuid.v4();
const languageCode = process.env.DIALOGFLOW_LANGUAGE || 'en-US';
 console.log('Loaded service account:', process.env.GOOGLE_APPLICATION_CREDENTIALS);


const sessionClient = new dialogflow.SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});



async function sendMessageToDialogflow(message, userId = null, userType = null) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  console.log("Intent Detected:", result.intent?.displayName);
  console.log("Query Text:", result.queryText);
  console.log("Response:", result.fulfillmentText);
  console.log("Confidence:", result.intentDetectionConfidence);

  // Handle custom intents with database queries
  console.log("🔥 Inside sendMessageToDialogflow");
console.log("Message:", message);
  const intentName = result.intent?.displayName;
  console.log(intentName,"intent")
  
  if (intentName && userId && userType === 'STUDENT') {
    const customResponse = await handleCustomIntents(intentName, message, userId);
    if (customResponse) {
      return customResponse;
    }
  }

  if (result.intent?.displayName === 'Default Fallback Intent') {
    return "I'm not sure I understand that yet. Can you try asking in a different way?";
  }

  return result.fulfillmentText || "Hmm, I didn't get that. Try rephrasing it.";
}

async function handleCustomIntents(intentName, message, userId) {
  try {
    switch (intentName) {
      case 'homework_today':
      case 'todays_homework':
      case 'what is homework today':
        return await chatbotDataService.getTodaysHomework(userId);
        
      case 'circular_today':
      case 'latest_circular':
      case 'school_circular':
        return await chatbotDataService.getLatestCircular(userId);
        
      case 'activity_today':
      case 'school_activity':
      case 'todays_activity':
        return await chatbotDataService.getTodaysActivity(userId);
        
      case 'attendance_status':
      case 'my_attendance':
        return await chatbotDataService.getAttendanceStatus(userId);
        
      case 'upcoming_events':
        return await chatbotDataService.getUpcomingEvents(userId);
        
      default:
        return null; // Let DialogFlow handle it
    }
  } catch (error) {
    console.error('Error handling custom intent:', error);
    return "Sorry, I'm having trouble accessing that information right now. Please try again later.";
  }
}

module.exports = { sendMessageToDialogflow };