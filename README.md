# infra

Infrastructure as [mise](https://github.com/HARBOR-Medical-AI/mise) scripts: what a stratus session builds and keeps, a ChRIS store on a VM, a HARBOR Trusted Domain, an OpenShift cluster, each as a `.mise` file in a folder named for what it serves. A script states, in words every cloud understands, what should exist, and a session plays it; played again it compares, line by line: an unchanged line does nothing, and a line that would build, change or bill asks first. This repository is a source of the stratus library, mounted in a session at `/scripts/<folder>/`.

## Scripts

`chrisproject/` is the ChRIS project's own services; a HARBOR tenant's Trusted Domain goes in a folder of its own.

- `chrisproject/store.mise`: the ChRIS store at `cube.chrisproject.org`, the CUBE every plugin's upload job registers with (`compute_names: NERC`). A network and a VM on Oracle Cloud, CUBE 6.11.0 on it, porter (the door to mise, ARGUS in the browser) beside it at `porter.chrisproject.org`, both names pointed at it at GoDaddy, and the accounts it holds. The admin password and each account's password are files on the host that plays the script, named in the lines, never in the repository.

## Playing a script

In a stratus session with the tasks tier (`stratus --host-control tasks`):

```
play /scripts/chrisproject/store.mise
```

The VM is 2 vCPU and 8 GiB. Each person signed in through porter runs a session of a few hundred MB beside CUBE; `vm cost store --memory 16` says what more memory costs, and raising `--memory` on the `vm new` line and playing again rebuilds the machine over the same data volume and address.

## Checks

`node scripts/check.mjs` reads every `.mise` file and refuses a line whose verb stratus does not have, or an environment reference other than `${HOME}`. CI runs it on every pull request.
