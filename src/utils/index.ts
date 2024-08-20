'use server';
import { redirect } from 'next/navigation';

async function handleSubmit(event: FormData) {
    const rawFormData = {
        firstname: event.get('firstname'),
        lastname: event.get('lastname'),
        email: event.get('email'),
        phone: event.get('phone'),
        service: event.get('service'),
        message: event.get('message'),
    };

    if (process.env.WEBHOOK) {
        await fetch(process.env.WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: '<@144855517154639873>',
                allowed_mentions: { users: ['144855517154639873'] },
                embeds: [
                    {
                        title: 'New Contact Form Submission',
                        description: `Submitted: <t:${Math.floor(Date.now() / 1000)}:R>`,
                        color: 11032055,
                        author: {
                            name: `User: ${rawFormData.firstname} ${rawFormData.lastname}`,
                        },
                        fields: [
                            {
                                name: 'Email',
                                value: `\`${rawFormData.email}\``,
                                inline: true,
                            },
                            {
                                name: 'Phone Number',
                                value: `\`${rawFormData.phone}\``,
                                inline: true,
                            },
                            {
                                name: 'Service',
                                value: `\`${rawFormData.service}\``,
                                inline: true,
                            },
                            {
                                name: 'Message',
                                value: `\`\`\`md\n${rawFormData.message}\n\`\`\``,
                                inline: true,
                            },
                        ],
                    },
                ],
            }),
        });
        redirect('/thanks');
    }
}

export { handleSubmit };
