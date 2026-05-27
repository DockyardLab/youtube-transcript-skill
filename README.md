# youtube-transcript-skill

A small CLI skill for turning YouTube captions into readable notes, timestamped lines, or JSON.

## What it does

This repo converts a YouTube video ID or URL into one of three output shapes:

1. **Readable Markdown** - default mode, with timestamps removed.
2. **Timestamped lines** - useful when you want time alignment.
3. **JSON** - best for agents and automated pipelines.

## Why it exists

Different workflows need different transcript shapes:

- humans want a readable note
- agents want structured data
- reviewers sometimes want timestamps

This repo keeps all three outputs behind one simple interface.

## How to Use

Use `transcript.js` with a YouTube URL or video ID.

### For humans

- Use the default mode for a clean transcript note.
- Use `timestamps` when you want to review timing against the source.

### For agents

- Use `--format json` when you need deterministic downstream processing.
- Use the default mode when you want a readable text artifact for summarization or note-taking.
- Use `timestamps` only when downstream logic depends on timing.

### Minimal examples

```bash
# Readable Markdown output
node transcript.js https://www.youtube.com/watch?v=EBw7gsDPAYQ

# Timestamped lines
node transcript.js EBw7gsDPAYQ --format timestamps

# Structured JSON
node transcript.js EBw7gsDPAYQ --format json
```

## Output Contract

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

## Limitations

- The video must have captions or a transcript available.
- Network access is required at runtime.
