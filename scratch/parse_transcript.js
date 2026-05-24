const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\HP\\.gemini\\antigravity\\brain\\1fa47953-83a4-4add-94ef-5ef83ee99e4d\\.system_generated\\logs\\transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let index = 0;
  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT' || obj.source === 'USER_EXPLICIT') {
        console.log(`\n--- USER INPUT STEP ${index} ---`);
        console.log(obj.content || JSON.stringify(obj));
      }
    } catch (e) {
      // ignore
    }
    index++;
  }
}

processLineByLine();
