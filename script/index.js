import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconPath = join(__dirname, 'iconfont.js');
const remoteIconPath = 'https://at.alicdn.com/t/c/font_4478885_cab4lylxzs8.js';

function handler(iconfont = '', iconPath, typePath, fill) {
  let iife = '';
  let newIconfont = iconfont;
  if (fill) {
    // replace the fill inside.
    const fillAttributeRegex = /fill="[^"]+"/g;
    newIconfont = iconfont.replace(
      fillAttributeRegex,
      'class="app-symbol-primary" fill-rule="evenodd" clip-rule="evenodd"'
    );
    iife = `(function() { const style = document.createElement('style'); style.innerHTML = '.app-symbol-primary { fill: ${fill}; }'; document.head.appendChild(style); })();`;
  }

  // add iife to the iconfont.js, add class style

  iconPath ??= join(__dirname, 'iconfont.js');

  // add iife to the iconfont.js, output the new iconfont.js
  fs.writeFileSync(iconPath, newIconfont + iife, 'utf8');

  // match symbol id to symbolbyids array
  const symbolByIds = [];
  const elementIdRegex = /id="[^"]+"/g;

  iconfont.replace(elementIdRegex, (match) => {
    let id = match.slice(4, -1);
    // 不需要 icon- 开头
    if (id.startsWith('icon-')) {
      id = id.replace('icon-', '');
    }
    symbolByIds.push(id);
  });

  typePath ??= join(__dirname, 'symbol-icons.d.ts');

  // generate union type files
  const typeFile = `export type AppSymbolIcons = ${symbolByIds.map((id) => `'${id}'`).join('|')};`;
  fs.writeFileSync(typePath, typeFile, 'utf8');
}

function go(path = '', option = {}) {
  const { iconPath, typePath, fill } = option;
  if (path.includes('//at.alicdn.com')) {
    path = path.startsWith('http') ? path : 'https:' + path;
    // replace the remote icon path to local icon path
    fetch(path)
      .then((res) => res.text())
      .then((iconfont) => {
        handler(
          iconfont,
          iconPath || join(__dirname, 'iconfont-remote.js'),
          typePath || join(__dirname, 'symbol-icons-remote.d.ts'),
          fill
        );
      });
    return;
  }

  const iconfont = fs.readFileSync(path, 'utf8');
  handler(iconfont, iconPath, typePath, fill);
}

// go(iconPath)
go(remoteIconPath, {
  iconPath: join(__dirname, '../public/iconfont-remote.js'),
  typePath: join(__dirname, '../src/types/symbol-icons-remote.d.ts'),
  fill: 'var(--app-symbol-primary)',
});
go('//at.alicdn.com/t/c/font_4478414_viaz8c7i4re.js', {
  iconPath: join(__dirname, '../public/iconfont-main.js'),
  typePath: join(__dirname, '../src/types/symbol-icons-main.d.ts'),
});
