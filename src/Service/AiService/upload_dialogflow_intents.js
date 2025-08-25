
// require('dotenv').config();
// const dialogflow = require('@google-cloud/dialogflow');
// const fs = require('fs');
// const csv = require('csv-parser');

// const projectId = 'studentbot-ustx';
// const keyFile = '/home/sabitha/Downloads/Student-Teachers/Backend/src/Service/AiService/serviceaccount.json';

// const intentsClient = new dialogflow.IntentsClient({
//   keyFilename: keyFile,
// });

// async function createIntent(displayName, trainingPhrasesParts, messageTexts) {
//   const agentPath = intentsClient.projectAgentPath(projectId);

//   const trainingPhrases = trainingPhrasesParts.map(phrase => ({
//     type: 'EXAMPLE',
//     parts: [{ text: phrase }],
//   }));

//   const messages = messageTexts.map(text => ({
//     text: { text: [text] },
//   }));

//   const intent = {
//     displayName,
//     trainingPhrases,
//     messages,
//   };

//   const request = {
//     parent: agentPath,
//     intent,
//   };

//   try {
//     const [response] = await intentsClient.createIntent(request);
//     console.log(`Created intent: ${displayName}`);
//   } catch (error) {
//     console.error(`Error creating intent ${displayName}:`, error);
//   }
// }

// function readCSV(filePath) {
//     return new Promise((resolve, reject) => {
//       const intents = [];
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', row => {
//           if (row.Question && row.Answer) {
//             intents.push({ question: row.Question, answer: row.Answer });
//           }
//         })
//         .on('end', () => resolve(intents))
//         .on('error', reject);
//     });
//   }
  
// (async () => {
//   try {
//     const intentsData = await readCSV(__dirname + '/questions.csv');
//     console.log(`Total questions to upload: ${intentsData.length}`);

//     // You can limit to 500 if your CSV has more
//     const limit = 500;
//     const toUpload = intentsData.slice(0, limit);

//     for (const { question, answer } of toUpload) {
//       const intentName = question
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '_')
//         .substring(0, 50);

//       await createIntent(intentName, [question], [answer]);
//     }

//     console.log('All intents uploaded successfully!');
//   } catch (err) {
//     console.error('Failed to upload intents:', err);
//   }
// })();
require('dotenv').config();
const fs = require('fs');
const dialogflow = require('@google-cloud/dialogflow');

const csv = require('csv-parser');

const projectId = 'studentbot-ustx';
const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log('Key file path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('Key file exists:', fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS));

const intentsClient = new dialogflow.IntentsClient({
  keyFilename: keyFile,
});

async function intentExists(displayName) {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const [intents] = await intentsClient.listIntents({ parent: agentPath });
  return intents.some(intent => intent.displayName === displayName);
}

async function createOrUpdateIntent(displayName, trainingPhrasesParts, messageTexts) {
  const agentPath = intentsClient.projectAgentPath(projectId);

  const trainingPhrases = trainingPhrasesParts.map(phrase => ({
    type: 'EXAMPLE',
    parts: [{ text: phrase }],
  }));

  const messages = messageTexts.map(text => ({
    text: { text: [text] },
  }));

  const intent = {
    displayName,
    trainingPhrases,
    messages,
  };

  try {
    // Check if intent exists
    if (await intentExists(displayName)) {
      console.log(`Intent ${displayName} already exists, updating...`);
      const [existingIntents] = await intentsClient.listIntents({ parent: agentPath });
      const existingIntent = existingIntents.find(intent => intent.displayName === displayName);
      
      // Update existing intent
      const updatedIntent = {
        name: existingIntent.name,
        displayName,
        trainingPhrases: [
          ...existingIntent.trainingPhrases,
          ...trainingPhrases,
        ],
        messages,
      };
      await intentsClient.updateIntent({ intent: updatedIntent });
      console.log(`Updated intent: ${displayName}`);
    } else {
      // Create new intent
      const request = {
        parent: agentPath,
        intent,
      };
      await intentsClient.createIntent(request);
      console.log(`Created intent: ${displayName}`);
    }
  } catch (error) {
    console.error(`Error processing intent ${displayName}:`, error);
  }
}

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const intents = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', row => {
        if (row.Question && row.Answer) {
          intents.push({ question: row.Question, answer: row.Answer });
        }
      })
      .on('end', () => resolve(intents))
      .on('error', reject);
  });
}

(async () => {
  try {
    const intentsData = await readCSV(__dirname + '/questions.csv');
    console.log(`Total questions to upload: ${intentsData.length}`);

    for (const { question, answer } of intentsData) {
      const timestamp = Date.now();
      const intentName = question
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .substring(0, 45) + `_${timestamp}`; // Ensure uniqueness with timestamp

      await createOrUpdateIntent(intentName, [question], [answer]);
    }

    console.log('All intents uploaded successfully!');
  } catch (err) {
    console.error('Failed to upload intents:', err);
  }
})();

