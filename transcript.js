#!/usr/bin/env node

import { YoutubeTranscript } from 'youtube-transcript-plus';

const argv = process.argv.slice(2);
const videoArg = argv.find((arg) => !arg.startsWith('--'));
const formatArg = readFormat(argv);

if (!videoArg) {
  console.error('Usage: transcript.js <video-id-or-url> [--format md|timestamps|json]');
  process.exit(1);
}

const videoId = extractVideoId(videoArg);

try {
  const entries = await YoutubeTranscript.fetchTranscript(videoId);
  const payload = {
    videoId,
    sourceUrl: toWatchUrl(videoId),
    mode: formatArg,
    entries: entries.map((entry) => ({
      offset: entry.offset,
      duration: entry.duration,
      text: normalizeText(entry.text),
    })),
  };

  if (formatArg === 'json') {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else if (formatArg === 'timestamps') {
    for (const entry of payload.entries) {
      process.stdout.write(`[${formatTimestamp(entry.offset / 1000)}] ${entry.text}\n`);
    }
  } else {
    const paragraphs = toReadableMarkdown(payload.entries);
    process.stdout.write(`${paragraphs.join('\n\n')}\n`);
  }
} catch (error) {
  console.error(`Error fetching transcript: ${error.message}`);
  process.exit(1);
}

function readFormat(args) {
  const index = args.indexOf('--format');
  if (index >= 0 && args[index + 1]) {
    const value = args[index + 1].toLowerCase();
    if (value === 'json' || value === 'timestamps') {
      return value;
    }
  }
  return 'md';
}

function extractVideoId(input) {
  if (!input.includes('youtube.com') && !input.includes('youtu.be')) {
    return input;
  }

  const match = input.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : input;
}

function normalizeText(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

function toReadableMarkdown(entries) {
  const paragraphs = [];
  let current = '';
  let lastEntry = null;

  for (const entry of entries) {
    if (!entry.text) continue;

    const startsNewParagraph =
      !current ||
      !lastEntry ||
      gapMs(lastEntry, entry) > 2500 ||
      sentenceEnds(lastEntry.text);

    if (startsNewParagraph) {
      if (current) paragraphs.push(current.trim());
      current = entry.text;
    } else {
      current += ` ${entry.text}`;
    }

    lastEntry = entry;
  }

  if (current) paragraphs.push(current.trim());
  return paragraphs.length ? paragraphs : [''];
}

function gapMs(prev, next) {
  return Math.max(0, next.offset - (prev.offset + (prev.duration ?? 0)));
}

function sentenceEnds(text) {
  return /[.!?。！？]$/.test(String(text).trim());
}

function formatTimestamp(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function toWatchUrl(videoIdValue) {
  return `https://www.youtube.com/watch?v=${videoIdValue}`;
}
