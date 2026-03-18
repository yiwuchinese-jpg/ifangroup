import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const path = request.nextUrl.searchParams.get('path');

    if (!process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'REVALIDATE_SECRET is not configured',
            },
            { status: 500 }
        );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'Invalid secret',
            },
            { status: 401 }
        );
    }

    if (!path) {
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'Missing path to revalidate',
            },
            { status: 400 }
        );
    }

    if (!path.startsWith('/')) {
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'Path must start with /',
            },
            { status: 400 }
        );
    }

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'Failed to revalidate path',
            },
            { status: 500 }
        );
    }
}
