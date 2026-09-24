import { existsSync, readFileSync } from 'node:fs';

// LinkedIn and other link previews read these tags; the image URL must be absolute.
it('declares a link-preview image that exists and is absolute', () => {
  const html = readFileSync('index.html', 'utf8');
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  expect(image).toBe('https://jerrickjohnson.github.io/jerrick-portfolio/og-image.png');
  expect(html).toMatch(/<meta property="og:image:width" content="1200"/);
  expect(html).toMatch(/<meta property="og:image:height" content="627"/);
  expect(html).toMatch(/<meta property="og:url" content="https:\/\/jerrickjohnson\.github\.io\/jerrick-portfolio\/"/);
  expect(html).toMatch(/<meta name="twitter:card" content="summary_large_image"/);
  expect(existsSync('public/og-image.png')).toBe(true);
});
