const terms = [
    {
        heading: 'Conditions of Use',
        content:
            'We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.',
    },
    {
        heading: 'Privacy Policy',
        content:
            'Before you continue using our website we advise you to read our privacy policy, link below, regarding our user data collection. It will help you better understand our practices.',
    },
    {
        heading: 'Copyright',
        content:
            'Content published on this website (digital downloads, images, texts, graphics, logos) is the property of Hiekki and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of Hiekki, with copyright authorship for this compilation by Hiekki.',
    },
    {
        heading: 'Communications',
        content:
            'The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the news on our website, you are going to receive regular messages from us. We will continue to communicate with you by posting news and notices on our website and by sending you messages. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.',
    },
    {
        heading: 'Applicable Law',
        content:
            'By visiting this website, you agree that the laws of Arkansas, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between Hiekki and you, or its business partners and associates.',
    },
    {
        heading: 'Disputes',
        content:
            'Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court of Arkansas and you consent to exclusive jurisdiction and venue of such courts.',
    },
    {
        heading: 'Comments, Reviews, and Emails',
        content:
            'Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. Content has to be free of software viruses, political campaign, and commercial solicitation.\n\nWe reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant Hiekki non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.',
    },
    {
        heading: 'License and Site Access',
        content:
            'We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.',
    },
    {
        heading: 'User Account',
        content:
            'If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.\n\nWe reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.',
    },
];

export default function TOS() {
    return (
        <section className='h-full'>
            <div className='container mx-auto h-full py-12'>
                <h1 className='pb-12 text-center text-4xl font-bold'>Terms of Service</h1>
                {terms.map((item, index) => {
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
