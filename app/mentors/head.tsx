export default function Head() {
    return (
        <>
            <title>Найдите своего идеального ментора | KuberCode</title>
            <meta
                name="description"
                content="Персональное наставничество от опытных разработчиков. Выберите ментора по специализации, опыту и технологиям. Онлайн-обучение с профессионалами."
            />
            <meta
                name="keywords"
                content="ментор, программирование, обучение, разработка, наставник, IT, онлайн обучение, React, TypeScript, Python, JavaScript"
            />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="Найдите своего идеального ментора | KuberCode"
            />
            <meta
                property="og:description"
                content="Персональное наставничество от опытных разработчиков. Выберите ментора по специализации, опыту и технологиям."
            />
            <meta property="og:image" content="/images/mentors-og.jpg" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="Найдите своего идеального ментора | KuberCode"
            />
            <meta
                name="twitter:description"
                content="Персональное наставничество от опытных разработчиков. Выберите ментора по специализации, опыту и технологиям."
            />
            <meta name="twitter:image" content="/images/mentors-og.jpg" />

            {/* Additional SEO */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="robots" content="index, follow" />
            <meta
                name="google-site-verification"
                content="your-verification-code"
            />
            <link rel="canonical" href="https://kubercode.com/mentors" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "KuberCode Менторство",
                        description:
                            "Персональное наставничество от опытных разработчиков",
                        provider: {
                            "@type": "Organization",
                            name: "KuberCode",
                            sameAs: ["https://kubercode.com"],
                        },
                        serviceType: "IT Education",
                        areaServed: "Russian Federation",
                        offers: {
                            "@type": "Offer",
                            availability: "https://schema.org/InStock",
                            priceCurrency: "RUB",
                            priceRange: "₽₽₽",
                        },
                    }),
                }}
            />
        </>
    );
}
