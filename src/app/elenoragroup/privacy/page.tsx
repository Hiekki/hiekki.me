const privacy = [
    {
        heading: 'Information We Collect',
        content:
            'Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.',
    },
    {
        heading: 'Log Data',
        content:
            'When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter.\n\nPlease be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.',
    },
    {
        heading: 'Collection and Use of Information',
        content:
            'We may collect personal information from you when you do any of the following on our website:\n\n• Use a mobile device or web browser to access our content\n• Contact us via email, social media, or on any similar technologies\n• When you mention us on social media\n• We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:\n\nPlease be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources.',
    },
    {
        heading: 'Security of Your Personal Information',
        content:
            'When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.\n\nAlthough we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach.',
    },
    {
        heading: 'How Long We Keep Your Personal Information',
        content:
            'We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you.\n\nHowever, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.',
    },
    {
        heading: 'Children’s Privacy',
        content:
            'We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.',
    },
    {
        heading: 'International Transfers of Personal Information',
        content:
            'The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.',
    },
    {
        heading: 'Your Rights and Controlling Your Personal Information',
        content:
            'You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.\n\nIf we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.\n\nIf you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity.\n\nIf you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.\n\nIf you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.',
    },
    {
        heading: 'Limits of Our Policy',
        content:
            'Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.',
    },
    {
        heading: 'Changes to This Policy',
        content:
            'At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.\n\nIf required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.',
    },
];

export default function Privacy() {
    return (
        <section className='h-full'>
            <div className='container mx-auto h-full py-12'>
                <h1 className='pb-12 text-center text-4xl font-bold'>Privacy Policy</h1>
                {privacy.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-6'>
                            <h2 className='text-4xl font-bold'>{item.heading}</h2>
                            <p className='pb-8 text-black/60 dark:text-white/60'>{item.content}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
