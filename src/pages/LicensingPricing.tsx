
import React from "react";

const LICENSES = [
  {
    title: "Personal License",
    bullets: [
      "For individual, non-commercial use",
      "Use in personal projects and portfolios",
      "No redistribution or resale",
      "Example pricing: $19 one-time",
    ],
  },
  {
    title: "Creator License",
    bullets: [
      "For independent creators and freelancers",
      "Use in monetized channels (YouTube, Patreon, etc.)",
      "Client work allowed",
      "Example pricing: $49 one-time",
    ],
  },
  {
    title: "Commercial License",
    bullets: [
      "For companies and organizations",
      "Unlimited business use",
      "Priority email support",
      "Example pricing: $199 per project",
    ],
  },
];

const FAQ = [
  {
    question: "Which license is right for me?",
    answer:
      "If you're using resources personally and not making money, choose Personal. For creators and client work, use Creator. For company use, select Commercial.",
  },
  {
    question: "Can I upgrade my license later?",
    answer:
      "Yes! You can upgrade from Personal or Creator to a higher license at any time, just pay the difference.",
  },
  {
    question: "What is considered commercial use?",
    answer:
      "Any project or organization that generates revenue or is for business purposes falls under commercial use.",
  },
  {
    question: "Do I need a license for each project?",
    answer:
      "Creator and Commercial licenses are valid per project, unless otherwise specified. Personal is for single-user, non-commercial use.",
  },
];

const LicensingPricing: React.FC = () => (
  <div className="container mx-auto max-w-5xl px-4 py-12">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">Choose the Right License for Your Project</h1>
    <p className="text-lg text-muted-foreground text-center mb-10">
      Clear terms. Fair pricing. Hassle-free.
    </p>
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {LICENSES.map((license) => (
        <div key={license.title} className="rounded-lg bg-white shadow-md border border-muted p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#553D8A]">{license.title}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 flex-1">
            {license.bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <section className="bg-gray-50 rounded-xl px-6 py-8 shadow-sm">
      <h3 className="text-2xl font-semibold mb-4 text-[#553D8A]">Frequently Asked Questions</h3>
      <ul className="space-y-6">
        {FAQ.map(({ question, answer }, idx) => (
          <li key={idx}>
            <p className="font-semibold">{question}</p>
            <p className="text-gray-700">{answer}</p>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default LicensingPricing;
