# Vaults UI Template

A simple UI template for vaults.

### High-level Architecture

```
- repo
  - drift-common (git submodule)
    - protocol
      - sdk
    - common-ts
    - react
    - icons
  - ui
```

### Setup

1. If you didn't clone this repo with the `--recursive` flag, first run `git submodule update --init`. This will pull down the latest commit in the `drift-common` submodule.
2. Run `cd drift-common && git submodule update --init && cd ..` to pull the latest from the `protocol` submodule.
3. Look through READMEs of other packages. Ones which definitely need to be handled:
   - drift-common/icons .. Needs env setup and to be compiled
4. Run `./build_all_sm.sh` - this builds and symlinks all of the local libraries
   - In case this doesn't work. `build_all_sm.sh` is just building and symlinking all of the necessary packages in the `drift-common` submodule : `drift-common/icons`, `drift-common/react`, and `drift-common/common-ts`, so you may be able to do this yourself manually or debug the issue.
5. In the future if you need to rebuild modules, just run `./build_all_sm.sh` again.
6. Make sure to checkout `master` branch for the submodules.
