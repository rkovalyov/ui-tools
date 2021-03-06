import chalk from 'chalk';
import { run } from 'jest';
import createJestConfig from '../../../test/createConfig';
const argv = process.argv.slice(2);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_PATH = '';

// Ensure environment variables are read.
require('../../../env');

// // Watch unless on CI or explicitly running all tests
// if (!process.env.CI && argv.indexOf('--watchAll') === -1 && argv.indexOf('--watchAll=false') === -1) {
//   argv.push('--watch');
// }

// Add any Jest configuration options here
argv.push('--config', JSON.stringify(createJestConfig()));
argv.push('--env', 'jsdom');

run(argv)
  .then(() => {
    console.log(chalk.green(`Tests completed`));
  })
  .catch(() => {
    console.log(chalk.red(`Tests failed`));
    process.exit(1);
  });
