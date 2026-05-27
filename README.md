# youtube-transcript-skill

Fetch a YouTube video’s captions and convert them into a clean text artifact.

This repo is a small transcript interface for both humans and agents:

- humans get a readable note
- agents get deterministic JSON
- reviewers can keep timestamps when needed

## Overview

`transcript.js` accepts a YouTube URL or video ID and returns one of three output modes:

1. **Readable Markdown** - default mode, with timestamps removed.
2. **Timestamped lines** - useful for review and alignment.
3. **JSON** - best for other agents or automated pipelines.

## Quick start

```bash
node transcript.js https://www.youtube.com/watch?v=EBw7gsDPAYQ
node transcript.js EBw7gsDPAYQ --format timestamps
node transcript.js EBw7gsDPAYQ --format json
```

## How to Use

### Human workflow

- Use the default mode for a clean readable transcript.
- Use `timestamps` when you want to review timing or compare against the source.

### Agent workflow

- Use `--format json` for deterministic downstream processing.
- Use the default mode when you want a clean text artifact for summarization or note-taking.
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

## Agent Interface

If you are another agent consuming this repo:

- Prefer `--format json` for deterministic post-processing.
- Prefer the default mode when generating readable notes.
- Use `timestamps` only when time alignment matters.

## Limitations

- The video must have captions or a transcript available.
- Network access is required at runtime.
