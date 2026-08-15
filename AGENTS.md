# 中山市启云智算信息技术有限责任公司官网 AI Maintenance Entry

This project uses modular technical documentation under `docs/technical/`.

## Task Modes

- **Read-only**: answer, explain, review, inspect code, or inspect logs. Report missing docs if relevant, but do not write files or maintenance logs.
- **Investigate**: reproduce, diagnose, research, or run commands without product changes. Define the observable signal first. Write docs only when durable facts are discovered and the user authorizes recording them.
- **Implement**: change product code, configuration, tests, or docs. After validation, perform exactly one documentation transaction for the task.
- **Bootstrap**: if `AGENTS.md`, required `docs/technical` global files, or all module README/log pairs are missing, enter bootstrap mode with `$bootstrap-technical-maintenance`.
- **Repair**: if structure exists but links, routes, module pairs, entry files, or placeholders are incomplete, repair only the gaps without overwriting existing facts.

## Context Route

Before project builds, tests, broad searches, services, migrations, or edits:

1. If Git is usable, inspect `git status --short` and preserve unrelated changes. For non-Git projects, note why Git state is unavailable.
2. Read `docs/technical/README.md` and `docs/technical/MODULE_INDEX.md`.
3. Select the smallest matching module set by task behavior, interface owner, and file prefix.
4. For a single-module task, read only that module README and latest dated maintenance entry.
5. Read `TECHNICAL_PLAN.md` and adjacent modules only for cross-module seam/security/storage/runtime/release work.
6. Shared styles, types, tooling, or registry files do not automatically require reading every module; route by the symbol or behavior being changed.
7. If the reading budget is insufficient, stop and state which additional modules are needed and why.

## Documentation Roles

- Global README: startup and routing protocol for choosing the smallest module context; not an architecture encyclopedia or change history.
- Module README: current stable interface, invariants, ownership, focused validation, and adjacent modules.
- Module maintenance log: task-level evidence and conclusions, including goal, root cause or finding, implementation or investigation result, files, validation, verified facts, unverified boundaries, product-behavior change status, risk, and rollback when relevant.
- Global maintenance log: one ledger row linking to module logs.
- Module index: update only when routing, task signals, file prefixes, or ownership changes.
- Technical plan: update only for cross-module seams, shared data/security/runtime/release constraints.
- Topic files: split stable facts by one owner and one subject, with a link from the owning README or plan.

## Documentation Transaction

Write one transaction per authorized Implement task, or per Investigate task only when durable facts are authorized for recording. Do not create command-by-command logs.

- Module README: current stable interface, invariants, ownership, focused validation, and adjacent modules.
- Module maintenance log: task goal, root cause or finding, implementation or investigation result, files, validation, verified facts, unverified boundaries, product-behavior change status, risk, and rollback.
- Global maintenance log: one ledger row linking to module logs.
- Module index: update only when routing, task signals, file prefixes, or ownership changes.
- Technical plan/topic files: update only for cross-module seams, shared data/security/runtime/release constraints, or stable topic facts.

## Write Budget

- Read-only: zero writes.
- Investigate: zero writes by default. If recording is authorized and durable facts are proven, prefer at most one module README or topic update, one module log entry, and one global ledger row. Touch the technical plan only for proven cross-module constraints.
- Single-module Implement: update only the affected module README when facts changed, its maintenance log, and the global ledger. Add router or plan edits only if their specific triggers fire.
- Cross-module Implement: update only affected module pairs plus necessary global router or plan edits. Do not broaden writes just because shared files were read.
- Bootstrap/Repair: write only the required structure, selected module pairs, missing templates, and evidence-backed replacements or correction entries.

## Split And Archive

- Split a README or plan into a topic file when one section exceeds roughly 80 lines, the file exceeds roughly 200 lines, or unrelated audiences/workflows compete in the same file. Leave a summary and link in the owning README or plan.
- Split or archive a maintenance log only when the active file is hard to scan, such as over roughly 500 lines or multiple years of dense entries. Keep the required `MAINTENANCE_LOG.md` as the latest-entry index and link to archives; never delete or silently rewrite history.

Record only long-lived reusable facts. Every documentation transaction must record verified facts, unverified boundaries, and whether product behavior changed. Do not record plaintext secrets, chat transcripts, command noise, or unverified guesses. Mark skipped validation explicitly. Do not commit or push unless explicitly authorized.
