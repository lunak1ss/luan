import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import projectsData from '../../../../../data/projects.json';

const DATA_DIR = join(process.cwd(), 'data');
const PROJECTS_FILE = join(DATA_DIR, 'projects.json');

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(PROJECTS_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    // 部署到 Netlify 等平台时运行时目录可能不含 data/，回退到构建时打包的数据
    return NextResponse.json(projectsData);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    writeFileSync(PROJECTS_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update projects' }, { status: 500 });
  }
}
