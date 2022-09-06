# util-js

## Installation

### From GitHub Packages:
To install you need first to create `.npmrc` file with `@alttiri:registry=https://npm.pkg.github.com` content:
```bash
echo @alttiri:registry=https://npm.pkg.github.com >> .npmrc
```

only then run

```bash
npm install @alttiri/util-js
```
Note, that GitHub Packages requires to have also `~/.npmrc` file with `//npm.pkg.github.com/:_authToken=TOKEN` content, where `TOKEN` is a token with the `read:packages` permission, take it here https://github.com/settings/tokens/new. 

### From GitHub:
Install the latest version from GitHub directly:
```bash
npm install git+https://github.com/alttiri/util-js.git
```

To install a specific version (based on git tag):
```bash
npm install git+https://github.com/alttiri/util-js.git#semver:2.0.0
```

To install a specific commit version:
```bash
npm install git+https://github.com/alttiri/util-js.git#5cb21d8c4815ab006589d3a36adedec3634ac72b
```

No need extra actions.
