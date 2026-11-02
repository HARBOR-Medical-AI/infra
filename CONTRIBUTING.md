# Contributing

A change is a pull request against `main` with the check green; the author merges it. `main` takes no direct pushes.

A script describes what should exist, not how it was built: comments say what a line is for, never where work stands. Secrets are never in a script; a line names a file on the host that plays it (`--admin-password-file ${HOME}/.config/…`). A new script goes in a folder named for what it serves (`chrisproject/`), and the README lists it in one sentence.

Before opening the pull request, play the changed script against its target from a stratus session, or say in the pull request that it was not played and why.
