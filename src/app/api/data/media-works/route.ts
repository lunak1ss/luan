import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import mediaData from '../../../../../data/media_works.json';

const DATA_DIR = join(process.cwd(), 'data');
const MEDIA_FILE = join(DATA_DIR, 'media_works.json');

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(MEDIA_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    // 部署到 Netlify 等平台时运行时目录可能不含 data/，回退到构建时打包的数据
    return NextResponse.json(mediaData);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    writeFileSync(MEDIA_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update media works' }, { status: 500 });
  }
}
