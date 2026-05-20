---
name: youtube-transcript
description: Convert a YouTube video ID or URL into readable transcript-style Markdown, timestamped caption lines, or JSON. Use when a user needs to fetch YouTube captions for summarization, note-taking, comparison, or downstream agent processing.
---

# YouTube Transcript

Convert YouTube captions into clean, reusable text.

## Inputs

- A YouTube video ID
- A standard watch URL
- A shortened youtu.be URL

## Outputs

- Default: readable Markdown paragraphs without timestamps
- `timestamps`: caption lines with time markers
- `json`: machine-readable transcript data

## Usage

```bash
node transcript.js <video-id-or-url>
node transcript.js <video-id-or-url> --format timestamps
node transcript.js <video-id-or-url> --format json
```

## Behavior

- Preserve the original caption text.
- Remove timestamps in the default mode.
- Collapse whitespace for cleaner reading.
- Return a non-zero exit code if captions are unavailable.

## For downstream agents

- Treat the default output as a linear reading artifact.
- Use `--format json` when you need structured entries.
- Use `--format timestamps` when precise timing matters.

