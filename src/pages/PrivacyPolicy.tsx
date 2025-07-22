import React from 'react';
import { motion } from 'framer-motion';
import { Home, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-mint mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Privacy Policy
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-12 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-mint mb-4">1. Information We Collect</h2>
            <p className="text-white/80 mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, subscribe to our newsletter, or contact us for support.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Name and email address</li>
              <li>• Payment information (processed securely through Stripe)</li>
              <li>• Shipping address for physical products</li>
              <li>• Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Automatically Collected Information</h3>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Device information and browser type</li>
              <li>• IP address and location data</li>
              <li>• Usage patterns and preferences</li>
              <li>• Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-mint mb-4">2. How We Use Your Information</h2>
            <p className="text-white/80 mb-4">We use the information we collect to:</p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Process transactions and deliver products/services</li>
              <li>• Send newsletters and marketing communications (with your consent)</li>
              <li>• Provide customer support and respond to inquiries</li>
              <li>• Improve our website and user experience</li>
              <li>• Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-mint mb-4">3. Payment Processing</h2>
            <p className="text-white/80 mb-6">
              All payment transactions are processed securely through Stripe, Inc. We do not store 
              your complete credit card information on our servers. Stripe's privacy policy governs 
              the collection and use of payment information. For more information, please visit 
              <a href="https://stripe.com/privacy" className="text-mint hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                Stripe's Privacy Policy
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">4. Information Sharing</h2>
            <p className="text-white/80 mb-4">We may share your information with:</p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Service providers (Stripe for payments, email service providers)</li>
              <li>• Legal authorities when required by law</li>
              <li>• Business partners with your explicit consent</li>
            </ul>
            <p className="text-white/80 mb-6">
              We do not sell, trade, or rent your personal information to third parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">5. Data Security</h2>
            <p className="text-white/80 mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">6. Your Rights</h2>
            <p className="text-white/80 mb-4">You have the right to:</p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Access and update your personal information</li>
              <li>• Request deletion of your data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Request data portability</li>
            </ul>

            <h2 className="text-2xl font-bold text-mint mb-4">7. Cookies</h2>
            <p className="text-white/80 mb-6">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize 
              content. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">8. Children's Privacy</h2>
            <p className="text-white/80 mb-6">
              Our services are designed for families, but we do not knowingly collect personal information 
              from children under 13 without parental consent. If you believe we have collected information 
              from a child under 13, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">9. Changes to This Policy</h2>
            <p className="text-white/80 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">10. Contact Us</h2>
            <p className="text-white/80 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="glass rounded-lg p-4">
              <p className="text-white font-semibold">JULDD Media</p>
              <p className="text-white/80">Email: privacy@julddmedia.com</p>
              <p className="text-white/80">Website: https://julddmedia.com</p>
            </div>
          </div>
        </motion.div>

        {/* Home Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/"
            className="btn-gradient px-8 py-4 rounded-full text-white font-bold flex items-center justify-center space-x-2 text-lg hover:scale-105 transition-transform inline-flex"
          >
            <Home className="w-6 h-6" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;