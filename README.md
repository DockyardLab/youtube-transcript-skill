# youtube-transcript-skill

Fetch a YouTube video’s captions and convert them into a clean text artifact.

## What it does

This tool turns a YouTube video ID or URL into one of three output modes:

1. **Readable Markdown** - default mode, with timestamps removed.
2. **Timestamped lines** - useful for review and alignment.
3. **JSON** - best for other agents or automated pipelines.

## Why it exists

Different workflows need different transcript shapes:

- humans want a readable note
- agents want structured data
- reviewers sometimes want timestamps

This repo keeps those outputs in one small interface.

## Quick start

```bash
node transcript.js https://www.youtube.com/watch?v=EBw7gsDPAYQ
node transcript.js EBw7gsDPAYQ --format timestamps
node transcript.js EBw7gsDPAYQ --format json
```

## Output contract

### Default

Returns Markdown paragraphs with:

- timestamps removed
- whitespace normalized
- original caption text preserved

### `timestamps`

Returns one caption line per entry:

```text
[0:00] Hello everyone...
```

### `json`

Returns a structured object with:

- `videoId`
- `sourceUrl`
- `entries`
- `mode`

## Agent-friendly notes

If you are another agent consuming this repo:

- Prefer `--format json` for deterministic post-processing.
- Prefer the default mode when generating readable notes.
- Use `timestamps` only when time alignment matters.

## Limitations

- The video must have captions or a transcript available.
- Network access is required at runtime.

