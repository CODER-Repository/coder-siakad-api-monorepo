const fs = require('fs');
const messageFile = process.argv[2];

const commitMsg = fs.readFileSync(messageFile, 'utf8').trim();
const commitPrefix = 'CSK';

if(!commitMsg.startsWith(commitPrefix)) {
  console.error(`\nError: Commit message must start with the prefix "${commitPrefix}".`);
  process.exit(1);
}