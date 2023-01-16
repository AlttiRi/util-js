# util-js

Some browser JS util function.

Mostly it's a draft version for personal use.

## Installation

### From NPM

```bash
npm install @alttiri/util-js
```

### From GitHub repository

```bash
npm install git+https://github.com/alttiri/util-js.git
```

<details>

<summary>More ways</summary>

### From GitHub repository (a specific version):

- **Based on SemVer:**
    ```bash
    npm install git+https://github.com/alttiri/util-js.git#semver:1.3.0
    ```
  Or add
    ```
    "@alttiri/util-js": "github:alttiri/util-js#semver:1.3.0"
    ```
  as `dependencies` in `package.json` file.

  See available [tags](https://github.com/AlttiRi/util-js/tags).

- **Based on a commit hash:**
    ```bash
    npm install git+https://github.com/alttiri/util-js.git#eea3068f8c70c6a500a44b69aeb0cb65ac8b80a6
    ```
  Or add
    ```
    "@alttiri/util-js": "github:alttiri/util-js#eea3068f8c70c6a500a44b69aeb0cb65ac8b80a6"
    ```
  as `dependencies` in `package.json` file.

  See available [commits hashes](https://github.com/AlttiRi/util-js/commits/master).


### From GitHub Packages:
To install you need first to create `.npmrc` file with `@alttiri:registry=https://npm.pkg.github.com` content:
```bash
echo @alttiri:registry=https://npm.pkg.github.com >> .npmrc
```

only then run

```bash
npm install @alttiri/util-node-js
```
Note, that GitHub Packages requires to have also `~/.npmrc` file (`.npmrc` in your home dir) with `//npm.pkg.github.com/:_authToken=TOKEN` content, where `TOKEN` is a token with the `read:packages` permission, take it here https://github.com/settings/tokens/new.


</details>
