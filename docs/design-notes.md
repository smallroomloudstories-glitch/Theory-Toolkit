# Theory Toolkit — Evolving Design Notes

> **Status:** Working ideas, not requirements carved in stone.
>
> This document records design ideas and principles that come up during development so they are not lost. Any item here may be changed, discarded, or revisited when implementation begins or testing suggests a better answer.

## Tooling workflow — transient GitHub write blocks

When an otherwise legitimate GitHub write is blocked with the specific OpenAI message that it "couldn't determine the safety status of the request," treat the first failure as potentially transient.

- Wait briefly, re-fetch the current file/SHA as appropriate, and retry the same intended legitimate write once without waiting for Rob to request a retry.
- If the second attempt succeeds, continue normally.
- If the second attempt fails with the same indeterminate-safety message, report it and use a manual fallback if needed rather than repeatedly hammering the connector.
- If the denial is materially different (authentication, permission, conflict, repository error, or an actual safety determination), stop and report that immediately instead of treating it as the transient glitch.
- Do not alter, disguise, fragment, or otherwise manipulate legitimate code merely to bypass a safety check. This is a retry policy, not a bypass policy.
