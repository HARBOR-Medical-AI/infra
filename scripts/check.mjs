// Reads every .mise file and refuses a line whose verb stratus does not have,
// or an environment reference other than ${HOME}. Comments and blank lines pass.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const VERBS = {
  net: ['new', 'plan', 'build', 'status', 'teardown'],
  vm: ['new', 'cost', 'plan', 'build', 'shell', 'protect', 'teardown'],
  chris: ['status', 'deploy', 'user'],
  cluster: ['new', 'plan', 'build', 'verify', 'status', 'protect', 'teardown'],
  spend: [],
  play: [],
  expect: [],
};

function files_find(dir, found = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files_find(path, found);
    else if (name.endsWith('.mise')) found.push(path);
  }
  return found;
}

let failures = 0;
for (const file of files_find(process.cwd())) {
  const lines = readFileSync(file, 'utf-8').split('\n');
  lines.forEach((line, index) => {
    const text = line.trim();
    if (text === '' || text.startsWith('#')) return;
    const [verb, second] = text.split(/\s+/);
    const refuse = (why) => { console.error(`${file}:${index + 1}: ${why}`); failures++; };
    if (!(verb in VERBS)) return refuse(`${verb}: not a verb stratus has`);
    if (VERBS[verb].length > 0 && !VERBS[verb].includes(second)) return refuse(`${verb} ${second ?? ''}: not a ${verb} verb (${VERBS[verb].join(', ')})`);
    for (const ref of text.matchAll(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g)) if (ref[1] !== 'HOME') refuse(`\${${ref[1]}}: only \${HOME} may be referenced`);
  });
}
if (failures > 0) process.exit(1);
console.log('every .mise line names a verb stratus has');
