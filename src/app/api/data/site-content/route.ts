import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import siteData from '../../../../../data/site_content.json';

const DATA_DIR = join(process.cwd(), 'data');
const CONTENT_FILE = join(DATA_DIR, 'site_content.json');

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(CONTENT_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    // 部署到 Netlify 等平台时运行时目录可能不含 data/，回退到构建时打包的数据
    return NextResponse.json(siteData);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    writeFileSync(CONTENT_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site content' }, { status: 500 });
  }
}
