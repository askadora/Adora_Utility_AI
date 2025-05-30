"use client";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Terms and Conditions</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h2>
          <p className="text-gray-700 dark:text-gray-300">
            By creating an account or using Adora AI, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">2. User Responsibilities</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate information and to update it as necessary.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">3. Prohibited Activities</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Do not use the service for unlawful purposes.</li>
            <li>Do not infringe on intellectual property rights.</li>
            <li>Do not distribute harmful, offensive, or abusive content.</li>
            <li>Do not attempt to gain unauthorized access to the platform.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">4. Changes to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update these terms from time to time. Continued use of the service means you accept the new terms. We will notify you of significant changes.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">5. Termination</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">6. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@adora.ai" className="text-sky-600 underline">support@adora.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
