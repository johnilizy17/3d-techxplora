import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using TechXplora, users agree to these Terms of Service. If you do not agree, you should discontinue use of the platform.'
    },
    {
      title: '2. Description of Service',
      content: 'TechXplora is an educational technology platform that provides:\n\n• Interactive quizzes and learning challenges\n• Curriculum-aligned activities\n• Tools for educators to monitor and support student learning'
    },
    {
      title: '3. Eligibility and Use',
      content: 'The platform is intended for use by:\n\n• Students (under supervision where applicable)\n• Educators and institutions\n• Authorized users\n\nInstitutions are responsible for ensuring appropriate use by students.'
    },
    {
      title: '4. User Accounts',
      content: 'Users are responsible for:\n\n• Providing accurate account information\n• Maintaining the confidentiality of login credentials\n• Ensuring responsible use of their account'
    },
    {
      title: '5. Acceptable Use Policy',
      content: 'Users agree not to:\n\n• Misuse or disrupt the platform\n• Upload harmful, abusive, or inappropriate content\n• Attempt unauthorized access to systems or data\n• Use the platform for non-educational or unlawful purposes'
    },
    {
      title: '6. Educational Responsibility',
      content: 'TechXplora is designed to support learning. Educators and institutions are responsible for:\n\n• Supervising student use\n• Integrating the platform appropriately within teaching activities'
    },
    {
      title: '7. Intellectual Property',
      content: 'All platform content, software, and materials are owned by Steamledge Limited or its licensors.\n\nUsers may not reproduce, distribute, or modify content without permission.'
    },
    {
      title: '8. Privacy and Data Protection',
      content: 'Use of the platform is governed by the TechXplora Privacy Policy.\n\nWe are committed to protecting user data, especially that of minors, in line with applicable laws and best practices.'
    },
    {
      title: '9. Service Availability',
      content: 'We aim to provide reliable access but do not guarantee uninterrupted service.\n\nWe may modify or update features to improve the platform.'
    },
    {
      title: '10. Limitation of Liability',
      content: 'TechXplora is provided on an "as is" basis.\n\nSteamledge Limited is not liable for:\n\n• Service interruptions\n• Data loss\n• Indirect or consequential damages'
    },
    {
      title: '11. Suspension and Termination',
      content: 'We reserve the right to suspend or terminate accounts that violate these Terms or misuse the platform.'
    },
    {
      title: '12. Changes to Terms',
      content: 'We may update these Terms periodically. Continued use of the platform indicates acceptance of the updated Terms.'
    },
    {
      title: '13. Governing Law',
      content: 'These Terms are governed by the laws of the Federal Republic of Nigeria.'
    },
    {
      title: '14. Contact Information',
      content: 'Steamledge Limited\nEmail: info.techxplora@steamledge.com\nWebsite: https://techxplora.co'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-6">
      {/* Header */}
      <div style={{height:60}}>
        </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
          TECHXPLORA TERMS OF SERVICE
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Terms of Service for TechXplora
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
                  <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                    <FileText className="text-purple-600 dark:text-purple-400" size={24} />
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
