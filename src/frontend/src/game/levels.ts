export interface PuzzleLevel {
  id: number;
  type: 'tap-trick' | 'drag-target' | 'multi-step' | 'riddle';
  instruction: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  failSafeChoices: string[];
}

export const puzzleLevels: PuzzleLevel[] = [
  // Level 1 - NEW: Count the shapes
  {
    id: 1,
    type: 'tap-trick',
    instruction: 'How many circles are there? Tap the correct number!',
    hint: 'Look carefully at all the shapes on the screen.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['3 circles', '2 circles', '4 circles'],
  },
  // Level 2 - NEW: Help the bee find honey
  {
    id: 2,
    type: 'drag-target',
    instruction: 'Help the bee reach the flower! 🐝',
    hint: 'Drag the bee to the flower.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag bee to flower', 'Tap the bee', 'Tap the flower'],
  },
  // Level 3 - NEW: Turn on the light
  {
    id: 3,
    type: 'multi-step',
    instruction: 'It\'s dark! Turn on the light 💡',
    hint: 'First find the switch, then flip it!',
    difficulty: 'Easy',
    points: 15,
    failSafeChoices: ['Tap bulb then switch', 'Tap switch only', 'Tap bulb only'],
  },
  // Level 4 - Hidden star
  {
    id: 4,
    type: 'tap-trick',
    instruction: 'Find the hidden star! ⭐',
    hint: 'Look in the corners... something is hiding!',
    difficulty: 'Easy',
    points: 15,
    failSafeChoices: ['Top right corner', 'Center', 'Bottom left'],
  },
  // Level 5 - Apple basket
  {
    id: 5,
    type: 'drag-target',
    instruction: 'Put the apple in the basket! 🍎',
    hint: 'Drag the apple to the basket on the right.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag apple to basket', 'Tap apple', 'Tap basket'],
  },
  // Level 6 - Riddle: What has keys
  {
    id: 6,
    type: 'riddle',
    instruction: 'What has keys but no locks?',
    hint: 'Think about musical instruments...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Piano', 'Door', 'Computer'],
  },
  // Level 7 - Brightest object
  {
    id: 7,
    type: 'tap-trick',
    instruction: 'Tap the brightest object! ☀️',
    hint: 'Which one gives the most light?',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['The sun', 'The moon', 'The star'],
  },
  // Level 8 - Key and lock
  {
    id: 8,
    type: 'drag-target',
    instruction: 'Unlock the door! 🔑',
    hint: 'Drag the key to the lock.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag key to lock', 'Tap key', 'Tap lock'],
  },
  // Level 9 - Riddle: What gets wet
  {
    id: 9,
    type: 'riddle',
    instruction: 'What gets wet while drying?',
    hint: 'You use it after a shower...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Towel', 'Sponge', 'Hair'],
  },
  // Level 10 - Smallest animal
  {
    id: 10,
    type: 'tap-trick',
    instruction: 'Tap the smallest animal! 🐜',
    hint: 'Size matters! Look at the actual size.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['The ant', 'The elephant', 'The giraffe'],
  },
  // Level 11 - Star to moon
  {
    id: 11,
    type: 'drag-target',
    instruction: 'Put the star next to the moon! ⭐',
    hint: 'Drag the star to the moon.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag star to moon', 'Tap star', 'Tap moon'],
  },
  // Level 12 - Riddle: What has hands
  {
    id: 12,
    type: 'riddle',
    instruction: 'What has hands but cannot clap?',
    hint: 'It tells you the time...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Clock', 'Statue', 'Robot'],
  },
  // Level 13 - Odd one out
  {
    id: 13,
    type: 'tap-trick',
    instruction: 'Find the odd one out! 🍌',
    hint: 'Three are the same, one is different!',
    difficulty: 'Medium',
    points: 15,
    failSafeChoices: ['The banana', 'First apple', 'Last apple'],
  },
  // Level 14 - Car to finish
  {
    id: 14,
    type: 'drag-target',
    instruction: 'Drive the car to the finish line! 🚗',
    hint: 'Drag the car to the checkered flag.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag car to flag', 'Tap car', 'Tap flag'],
  },
  // Level 15 - Riddle: What can travel
  {
    id: 15,
    type: 'riddle',
    instruction: 'What can travel around the world while staying in a corner?',
    hint: 'You put it on letters...',
    difficulty: 'Hard',
    points: 30,
    failSafeChoices: ['Stamp', 'Airplane', 'Internet'],
  },
  // Level 16 - AI Neural Network
  {
    id: 16,
    type: 'tap-trick',
    instruction: 'Activate the AI neural network! Tap the glowing node! ⚡',
    hint: 'Look for the node that\'s different from the others.',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['The glowing cyan node', 'Any blue node', 'All nodes'],
  },
  // Level 17 - Riddle: What is full of holes
  {
    id: 17,
    type: 'riddle',
    instruction: 'What is full of holes but still holds water?',
    hint: 'You use it to clean dishes...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Sponge', 'Bucket', 'Net'],
  },
  // Level 18 - Data to processor
  {
    id: 18,
    type: 'drag-target',
    instruction: 'Feed data to the AI processor! 💾',
    hint: 'Drag the data disk to the robot processor.',
    difficulty: 'Medium',
    points: 15,
    failSafeChoices: ['Drag data to processor', 'Tap data', 'Tap processor'],
  },
  // Level 19 - Morning routine
  {
    id: 19,
    type: 'tap-trick',
    instruction: 'What do you use first in the morning? 🪥',
    hint: 'Think about your morning hygiene routine!',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Toothbrush', 'Hairbrush', 'Shoes'],
  },
  // Level 20 - Riddle: What has a head
  {
    id: 20,
    type: 'riddle',
    instruction: 'What has a head and a tail but no body?',
    hint: 'You use it to buy things...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Coin', 'Snake', 'Arrow'],
  },
  // Level 21 - Coffee time
  {
    id: 21,
    type: 'drag-target',
    instruction: 'Time for coffee! Pour it in the cup! ☕',
    hint: 'Drag the coffee pot to the cup.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag coffee to cup', 'Tap coffee', 'Tap cup'],
  },
  // Level 22 - Traffic light
  {
    id: 22,
    type: 'tap-trick',
    instruction: 'When can you cross the road? 🚦',
    hint: 'Which traffic light color means GO?',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Green light', 'Red light', 'Yellow light'],
  },
  // Level 23 - Riddle: What goes up
  {
    id: 23,
    type: 'riddle',
    instruction: 'What goes up but never comes down?',
    hint: 'It happens every year on your birthday...',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Age', 'Balloon', 'Smoke'],
  },
  // Level 24 - Recycling
  {
    id: 24,
    type: 'drag-target',
    instruction: 'Recycle the bottle! ♻️',
    hint: 'Drag the bottle to the recycling bin.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag bottle to bin', 'Tap bottle', 'Tap bin'],
  },
  // Level 25 - Phone battery
  {
    id: 25,
    type: 'tap-trick',
    instruction: 'Your phone is dying! What do you need? 📱',
    hint: 'What gives power to your phone?',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Charger', 'Phone', 'Battery'],
  },
  // Level 26 - Riddle: What has cities
  {
    id: 26,
    type: 'riddle',
    instruction: 'What has cities but no houses, forests but no trees?',
    hint: 'You use it to find directions...',
    difficulty: 'Hard',
    points: 30,
    failSafeChoices: ['Map', 'Book', 'Computer'],
  },
  // Level 27 - Smart home
  {
    id: 27,
    type: 'multi-step',
    instruction: 'Turn on the smart home system! 🏠',
    hint: 'First plug it in, then press the power button!',
    difficulty: 'Medium',
    points: 20,
    failSafeChoices: ['Plug then power', 'Power only', 'Plug only'],
  },
  // Level 28 - Email inbox
  {
    id: 28,
    type: 'tap-trick',
    instruction: 'Which email is most important? 📧',
    hint: 'Look for the starred or marked email!',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Starred email', 'First email', 'Last email'],
  },
  // Level 29 - File organization
  {
    id: 29,
    type: 'drag-target',
    instruction: 'Organize your files! Put the document in the folder! 📄',
    hint: 'Drag the file to the folder.',
    difficulty: 'Easy',
    points: 10,
    failSafeChoices: ['Drag file to folder', 'Tap file', 'Tap folder'],
  },
  // Level 30 - Final riddle
  {
    id: 30,
    type: 'riddle',
    instruction: 'What begins with T, ends with T, and has T in it?',
    hint: 'You drink from it...',
    difficulty: 'Hard',
    points: 30,
    failSafeChoices: ['Teapot', 'Text', 'Tent'],
  },
];
