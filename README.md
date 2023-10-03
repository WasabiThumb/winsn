# winsn
Windows Path Short Name ([GetShortPathNameW](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getshortpathnamew)) for NodeJS

## Usage
Convert a long path name to short path name:
```js
const shortName = require("winsn");
shortName("C:\\Program Files"); // C:\PROGRA~1
```

Handle non-Windows OS:
```js
const shortName = require("winsn");
if (shortName.isAvailable()) {
    shortName("C:\\Program Files (x86)"); // C:\PROGRA~2
}
```

Handle potentially invalid long path name:
```js
const shortName = require("winsn");
const long = "Q:\\nonexistent";
let short;

short = shortName.elseNull(long); // null (all host machines!)
console.log(`${long} -> ${short}`); // Q:\nonexistent -> null

short = shortName.elseLong(long); // Q:\nonexistent
console.log(`${long} -> ${short}`); // Q:\nonexistent -> Q:\nonexistent
```

## Why
- Flexibility in cross-platform toolkits that assume unix-like paths where no whitespace or quotes are allowed
- Reduce console clutter
- 🤷
