# Specification

## Summary
**Goal:** Ensure the provided hidden YouTube video starts playing reliably after the first user interaction, even if the interaction occurs before the player finishes initializing, and plays with audible audio when permitted by browser policies.

**Planned changes:**
- Update the hidden YouTube player flow so it initializes once on fresh load and remains non-visible, while safely handling a “play requested” state if the first user interaction happens before the player is ready.
- On the first user interaction, attempt to play and unmute; if unmuting is blocked by browser policy, keep playback running and retry unmuting only on a subsequent permitted user gesture.
- Prevent repeated YouTube player initialization during normal interactions (including scrolling) and ensure no visible UI/controls are added or changed.

**User-visible outcome:** After the user’s first tap/click/keypress, the hidden YouTube link video begins playing reliably, and audio is audible when allowed (or becomes audible on the next permitted gesture if initially blocked), with no new visible UI introduced.
