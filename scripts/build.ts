import 'zx/globals';

(async () => {
  const cwd = process.cwd();
  const dir = path.resolve(cwd, 'src');
  const files = await fs.readdir(dir);
  console.log(`Files to build: ${files.join(', ')}`);
  console.log(`Building...`);
  for (const file of files) {
    // bun build src/context7.ts --minify --outfile dist/context7.mjs --target=node
    const fileWithoutExt = file.replace(/\.ts$/, '');
    const result = await $`bun build ${path.resolve(dir, file)} --external puppeteer --external effect --external @valibot/to-json-schema  --minify --outfile dist/${fileWithoutExt}.mjs --target=node`;
    console.log(result.stdout);
  }
})().catch(console.error);
