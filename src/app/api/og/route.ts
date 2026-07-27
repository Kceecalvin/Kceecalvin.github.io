import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { createElement } from 'react';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'CALDEV Engineering';

  try {
    return new ImageResponse(
      createElement(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px',
            background: '#020202',
            color: '#ffffff',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
          },
        },
        createElement(
          'div',
          { style: { fontSize: 26, color: '#ff5f1f', marginBottom: 24 } },
          'CALDEV',
        ),
        createElement('div', null, title),
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    const fallback = await readFile(path.join(process.cwd(), 'public/og-default.png'));
    return new Response(fallback, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
}
