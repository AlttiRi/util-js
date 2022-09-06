# util-js

## Installation

### From GitHub Packages:
To install you need fisrt to create `.npmrc` file with `@alttiri:registry=https://npm.pkg.github.com` content:
```bash
echo @alttiri:registry=https://npm.pkg.github.com >> .npmrc
```

only then run

```bash
npm install @alttiri/util-js
```
Note, that GitHub Packages requires to have also `~/.npmrc` file with `//npm.pkg.github.com/:_authToken=TOKEN` content, where `TOKEN` is a token with the `read:packages` permission, take it here https://github.com/settings/tokens/new. 

### From GitHub:
Install the lastest version from GitHub directly:
```bash
npm install git+https://github.com/alttiri/util-js.git
```

To install a specific version (based on git tag):
```bash
npm install git+https://github.com/alttiri/util-js.git#semver:2.0.0
```

To install a specific commit version:
```bash
npm install git+https://github.com/alttiri/util-js.git#94b1bff9c536a0e4be67f7d021c9e7def4e0b4d1
```

No need extra actions.
