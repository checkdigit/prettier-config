# Formatting fixtures

These files are committed formatting baselines for `index.json`. They are parsed
and formatted, but are not compiled or executed. The `package.json` fixture
is sample data; its dependencies do not need to be installed.

| Fixture            | Behavior covered                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `types.ts`         | Oxc TypeScript: generics, unions, intersections, mapped and conditional types, tuples, `satisfies`, and `as const` |
| `expressions.ts`   | Oxc TypeScript: quotes, templates, destructuring, optional chaining, method chains, ternaries, and comments        |
| `functions.ts`     | Oxc TypeScript: overloads, generic functions, multiline parameters, async functions, and error handling            |
| `classes.ts`       | Oxc TypeScript: private fields, parameter properties, accessors, and generators                                    |
| `job-list.tsx`     | Oxc TSX and Tailwind: JSX wrapping, generic arrow functions, and static and conditional class ordering             |
| `component.svelte` | Svelte and Tailwind: embedded TypeScript/CSS, bindings, directives, control flow, and class ordering               |
| `document.xml`     | XML: namespaces, attributes, self-closing elements, entities, mixed content, and CDATA                             |
| `package.json`     | Package JSON: top-level keys, lifecycle scripts, dependency ordering, and export conditions                        |

Run `npm test` from the repository root to check these baselines with the current
Prettier configuration and dependency versions. The existing `prettier . --check`
command includes every fixture, so no separate test runner is needed.

After changing the configuration or upgrading Prettier or a plugin:

1. Run `npm test` to identify formatting changes.
2. Run `npm run prettier:fix` to update the baselines.
3. Review `git diff -- test` before accepting the new formatting.
4. Run `npm test` again to confirm the updated fixtures are stable.

Add new syntax examples here when fixing a formatting regression. Keep them under
the shared root configuration so they exercise the configuration consumers use.
