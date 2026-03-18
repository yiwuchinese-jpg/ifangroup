import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

function getWriteClient() {
    const token = process.env.SANITY_AUTH_TOKEN;

    if (!token) {
        throw new Error('SANITY_AUTH_TOKEN is not configured');
    }

    return createClient({
        projectId: 'm2e07kon',
        dataset: 'production',
        apiVersion: '2024-02-26',
        useCdn: false,
        token,
    });
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

        if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const writeClient = getWriteClient();

        // Check if email already exists
        const existingSubscriber = await writeClient.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email: normalizedEmail }
        );

        if (existingSubscriber) {
            if (existingSubscriber.status === 'unsubscribed') {
                // Reactivate
                await writeClient.patch(existingSubscriber._id).set({ status: 'active' }).commit();
                return NextResponse.json({ message: 'Subscription reactivated successfully' }, { status: 200 });
            }
            return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
        }

        // Create new subscriber
        await writeClient.create({
            _type: 'subscriber',
            email: normalizedEmail,
            source: 'Footer Newsletter',
            status: 'active',
            subscribedAt: new Date().toISOString(),
        });

        return NextResponse.json({ message: 'Subscription successful' }, { status: 201 });
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
