// upload_project_intents.js
require('dotenv').config();
const dialogflow = require('@google-cloud/dialogflow');
const fs = require('fs');
const csv = require('csv-parser');

const projectId = 'studentbot-ustx';
const keyFile = 'C:/Users/sabit/OneDrive/Documents/student teacehr/student teacher/Backend/src/Service/AiService/serviceaccount.json';

const intentsClient = new dialogflow.IntentsClient({
  keyFilename: keyFile,
});

async function createProjectIntent(displayName, trainingPhrases, responseText) {
  const agentPath = intentsClient.projectAgentPath(projectId);

  const trainingPhrasesObj = trainingPhrases.map(phrase => ({
    type: 'EXAMPLE',
    parts: [{ text: phrase }],
  }));

  const messages = [{
    text: { text: [responseText] },
  }];

  const intent = {
    displayName,
    trainingPhrases: trainingPhrasesObj,
    messages,
  };

  const request = {
    parent: agentPath,
    intent,
  };

  try {
    const [response] = await intentsClient.createIntent(request);
    console.log(`✅ Created intent: ${displayName}`);
  } catch (error) {
    console.error(`❌ Error creating intent ${displayName}:`, error.message);
  }
}

// Project-specific intents with multiple training phrases
const projectIntents = [
  {
    name: 'homework_today',
    trainingPhrases: [
      'What is homework today',
      'What is today\'s homework',
      'Any homework today',
      'Show me homework',
      'Today homework',
      'Homework for today',
      'What homework do we have',
      'Is there any homework',
    ],
    response: 'I\'ll check today\'s homework for your child.'
  },
  {
    name: 'circular_today',
    trainingPhrases: [
      'What is the circular today',
      'Any new circular',
      'Show me circular',
      'School announcements',
      'Latest circular',
      'Recent circular',
      'School circular',
      'Any notice today',
    ],
    response: 'I\'ll get the latest school circulars for you.'
  },
  {
    name: 'activity_today',
    trainingPhrases: [
      'What is activity today',
      'Any activity today',
      'School activities',
      'Today\'s activities',
      'What activities are there',
      'School events today',
      'Any events today',
    ],
    response: 'I\'ll check today\'s school activities for your child.'
  },
  {
    name: 'attendance_status',
    trainingPhrases: [
      'What is my attendance',
      'Show attendance',
      'How many days present',
      'Attendance percentage',
      'My child attendance',
      'Attendance record',
      'How many days absent',
    ],
    response: 'I\'ll check your child\'s attendance status.'
  },
  {
    name: 'upcoming_events',
    trainingPhrases: [
      'Upcoming events',
      'What events coming',
      'School calendar',
      'Future events',
      'Next events',
      'Upcoming activities',
      'What\'s next in school',
    ],
    response: 'I\'ll show you upcoming school events.'
  },
  {
    name: 'project_info',
    trainingPhrases: [
      'What is this system',
      'Tell me about this project',
      'What is Student Activity Monitoring',
      'How does this system work',
      'About this application',
    ],
    response: `🏫 **Student Activity Monitoring System**

This is a comprehensive school management system that helps parents stay connected with their child's academic activities.

**Key Features:**
📚 **For Parents:** View homework, circulars, activities, attendance, and communicate with teachers
👨‍🏫 **For Teachers:** Post homework, mark attendance, share activities, and receive parent messages  
👨‍💼 **For Principal:** Manage staff, students, subjects, and overall school operations

**Technology:** Built with React.js, Node.js, Express.js, and MySQL

Ask me about today's homework, circulars, activities, or attendance! 😊`
  }
];

async function uploadProjectIntents() {
  console.log('🚀 Starting to upload project-specific intents...\n');
  
  for (const intent of projectIntents) {
    await createProjectIntent(intent.name, intent.trainingPhrases, intent.response);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ All project-specific intents uploaded successfully!');
  console.log('🎯 Your chatbot can now handle:');
  console.log('   - Homework queries');
  console.log('   - Circular/announcement requests');
  console.log('   - Activity information');
  console.log('   - Attendance status');    
  console.log('   - Upcoming events');
  console.log('   - Project information');
}

// Run the upload
uploadProjectIntents().catch(console.error);