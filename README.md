# Cloud Functions Latency Test

Simple testing of Google Cloud Functions with Firestore in the same region and in different regions.

Using deno because it supports:
- Top level await
- Fetch API (similar to browser)
- Runs TypeScript out of the box

## Usage
```bash
$ deno run --allow-net index.ts
```