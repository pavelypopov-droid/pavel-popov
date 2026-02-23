export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Павел Попов",
    jobTitle: "IT & FinTech Advisor, AI Expert",
    url: "https://beyondcore.pro",
    email: "popov@iofm.ru",
    telephone: "+998951480206",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "FinTech",
      "Digital Transformation",
      "IT Strategy",
      "Machine Learning",
      "RegTech",
      "DWH",
      "Speech Analytics",
    ],
    alumniOf: "МГУ им. М.В. Ломоносова",
    sameAs: [
      "https://www.linkedin.com/in/pavel-popov-19917266/",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Павел Попов — IT & FinTech Consulting",
    description:
      "Международный IT консультант и AI эксперт с 25-летним опытом в FinTech. Цифровая трансформация, AI внедрение, DWH, RegTech под ключ.",
    serviceType: ["IT Consulting", "AI Implementation", "FinTech Advisory"],
    areaServed: ["UZ", "KZ", "KG", "TJ", "TM", "AZ"],
    url: "https://beyondcore.pro",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
