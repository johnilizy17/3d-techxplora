import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: '1. Introduction',
      content: 'TechXplora, developed by Steamledge Limited ("we", "our", or "us"), is committed to protecting the privacy, safety, and personal data of all users, including students, educators, and institutional partners.\n\nThis Privacy Policy explains how we collect, use, store, and protect personal data in compliance with applicable data protection laws, including the Nigeria Data Protection Regulation (NDPR) and internationally recognized data protection principles.'
    },
    {
      title: '2. Scope',
      content: 'This policy applies to all users of the TechXplora platform, including:\n\n• Students (including minors)\n• Teachers and educators\n• School administrators\n• Other authorized users'
    },
    {
      title: '3. Information We Collect',
      content: 'We collect only data that is necessary to provide and improve the learning experience.\n\nA. Personal Data\n• Name or username\n• Email address\n• Gender\n• School, class, or institutional affiliation\n\nB. Educational Data\n• Quiz responses and performance\n• Learning activity participation\n• Progress and engagement metrics\n\nC. Technical Data\n• IP address\n• Device and browser information\n• Platform usage logs'
    },
    {
      title: '4. Legal Basis for Processing',
      content: 'We process personal data based on:\n\n• Legitimate educational interest\n• Consent, where applicable (particularly for minors via schools or guardians)\n• Contractual necessity, where services are provided to institutions'
    },
    {
      title: '5. How We Use Data',
      content: 'We use data strictly for:\n\n• Delivering and improving learning experiences\n• Enabling teachers to monitor student progress\n• Supporting formative assessment and feedback\n• Maintaining platform security and functionality\n• Improving platform design and performance\n\nWe do not use personal data, especially student data, for advertising, profiling, or commercial marketing purposes.'
    },
    {
      title: '6. Children\'s Data and Safeguarding',
      content: 'TechXplora is designed for use in educational environments and may be used by minors.\n\nWe apply enhanced protections for children\'s data:\n\n• Data collection is limited to what is strictly necessary for learning\n• Data is used solely for educational purposes\n• No targeted advertising or behavioral profiling is conducted\n• Schools or authorized institutions act as intermediaries where appropriate\n• We support requests from schools or guardians regarding student data\n\nWe are committed to aligning with child online protection principles and safeguarding best practices.'
    },
    {
      title: '7. Data Sharing and Disclosure',
      content: 'We do not sell or rent personal data.\n\nWe may share data only:\n\n• With authorized schools and educators for educational purposes\n• With trusted third-party service providers (under strict data protection agreements)\n• Where required by law or regulatory authorities\n\nAll third parties are required to maintain confidentiality and comply with data protection standards.'
    },
    {
      title: '8. Data Security',
      content: 'We implement appropriate technical and organizational safeguards, including:\n\n• Secure data storage and encryption practices\n• Role-based access control\n• Monitoring and protection against unauthorized access\n• Regular system updates and security checks'
    },
    {
      title: '9. Data Retention',
      content: 'We retain personal data only for as long as necessary to:\n\n• Provide learning services\n• Support institutional use\n• Comply with legal obligations\n\nData may be deleted upon request, subject to applicable requirements.'
    },
    {
      title: '10. User Rights',
      content: 'In line with NDPR and global standards, users (or institutions/guardians on behalf of students) have the right to:\n\n• Access their personal data\n• Request correction of inaccurate data\n• Request deletion of personal data\n• Object to certain types of processing\n\nRequests can be made via: info.techxplora@steamledge.com'
    },
    {
      title: '11. International Data Transfers',
      content: 'Where data is processed outside Nigeria, we ensure that appropriate safeguards are in place to protect user data in line with applicable data protection standards.'
    },
    {
      title: '12. Updates to This Policy',
      content: 'We may update this Privacy Policy periodically. Updates will be reflected on this page with a revised effective date.'
    },
    {
      title: '13. Contact Information',
      content: 'TechXplora from Steamledge Limited\nEmail: info.techxplora@steamledge.com\nWebsite: https://techxplora.co'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-6">
      {/* Header */}
      <div style={{height:60}}/>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
          TECHXPLORA PRIVACY POLICY
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Privacy Policy for TechXplora
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {sections.map((section, idx) => {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-8"
            >
              <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-lg/20 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                    <Shield className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
