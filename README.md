# Document Harness Meetup

Open Slide presentation workspace for the Document Harness meetup deck.

## View Online

<https://document-harness-meetup.vercel.app/s/document-harness-meetup>

## Download

- GitHub: <https://github.com/MadKangYu/document-harness-meetup>
- ZIP: <https://github.com/MadKangYu/document-harness-meetup/archive/refs/heads/main.zip>

## Local Setup

```bash
git clone https://github.com/MadKangYu/document-harness-meetup.git
cd document-harness-meetup
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/s/document-harness-meetup
```

## Slide Source

The deck source is:

```text
slides/document-harness-meetup/index.tsx
```

Each page is an Open Slide `Page` component rendered on a fixed 1920 x 1080 canvas.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Open Slide dev server. |
| `npm run build` | Build the static deployment bundle. |
| `npm run preview` | Preview the built bundle locally. |
