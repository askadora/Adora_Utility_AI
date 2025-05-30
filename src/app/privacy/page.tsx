"use client";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Adora AI Privacy Policy</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your privacy is important to us. This Privacy Policy explains how Adora AI collects, uses, and protects your personal information when you use our services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Personal information you provide during signup (name, email, etc.).</li>
            <li>Usage data, such as how you interact with our platform.</li>
            <li>Technical data, such as IP address, browser type, and device information.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>To provide and improve our services.</li>
            <li>To communicate with you about your account or updates.</li>
            <li>To ensure the security and integrity of our platform.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We do not sell your personal information. We may share data with trusted third parties who assist us in operating our platform, as required by law, or to protect our rights.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">5. Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We implement reasonable security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">6. Your Rights</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>You can access, update, or delete your personal information at any time.</li>
            <li>You can opt out of marketing communications.</li>
            <li>Contact us for any privacy-related requests.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">7. Changes to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">8. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@adora.ai" className="text-sky-600 underline">support@adora.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
} 