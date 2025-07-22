import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
            <FileText className="w-12 h-12 text-mint mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Terms of Service
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
            <h2 className="text-2xl font-bold text-mint mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 mb-6">
              By accessing and using JULDD Media's website and services, you accept and agree to be 
              bound by the terms and provision of this agreement. If you do not agree to abide by 
              the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">2. Description of Service</h2>
            <p className="text-white/80 mb-6">
              JULDD Media provides creative content including AI-animated children's songs, custom 
              merchandise, character-based content, and related digital products and services.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">3. User Accounts</h2>
            <p className="text-white/80 mb-4">To access certain features, you may need to create an account. You agree to:</p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Provide accurate and complete information</li>
              <li>• Maintain the security of your account credentials</li>
              <li>• Accept responsibility for all activities under your account</li>
              <li>• Notify us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-2xl font-bold text-mint mb-4">4. Purchases and Payments</h2>
            <h3 className="text-xl font-semibold text-white mb-3">Payment Processing</h3>
            <p className="text-white/80 mb-4">
              All payments are processed securely through Stripe. By making a purchase, you agree to 
              Stripe's Terms of Service and Privacy Policy.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-3">Pricing and Availability</h3>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• All prices are in USD and subject to change without notice</li>
              <li>• Product availability is not guaranteed</li>
              <li>• We reserve the right to limit quantities</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Refunds and Returns</h3>
            <p className="text-white/80 mb-6">
              Digital products are generally non-refundable. Physical products may be returned within 
              30 days of purchase in original condition. Contact us for return authorization.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">5. Intellectual Property</h2>
            <p className="text-white/80 mb-4">
              All content on this website, including but not limited to:
            </p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Songs, music, and audio content</li>
              <li>• Character designs and artwork</li>
              <li>• Videos and animations</li>
              <li>• Text, graphics, and logos</li>
              <li>• Software and website design</li>
            </ul>
            <p className="text-white/80 mb-6">
              Are the exclusive property of JULDD Media and are protected by copyright, trademark, 
              and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">6. User Content and Conduct</h2>
            <p className="text-white/80 mb-4">You agree not to:</p>
            <ul className="text-white/80 mb-6 space-y-2">
              <li>• Use our services for any unlawful purpose</li>
              <li>• Infringe on intellectual property rights</li>
              <li>• Upload malicious code or viruses</li>
              <li>• Harass or harm other users</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
            </ul>

            <h2 className="text-2xl font-bold text-mint mb-4">7. Privacy</h2>
            <p className="text-white/80 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of our services, to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">8. Disclaimers</h2>
            <p className="text-white/80 mb-6">
              Our services are provided "as is" without any warranties, express or implied. We do not 
              guarantee that our services will be uninterrupted, secure, or error-free.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">9. Limitation of Liability</h2>
            <p className="text-white/80 mb-6">
              JULDD Media shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">10. Indemnification</h2>
            <p className="text-white/80 mb-6">
              You agree to defend, indemnify, and hold harmless JULDD Media from and against any claims, 
              damages, obligations, losses, liabilities, costs, or debt arising from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">11. Termination</h2>
            <p className="text-white/80 mb-6">
              We may terminate or suspend your account and access to our services immediately, without 
              prior notice, for conduct that we believe violates these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">12. Governing Law</h2>
            <p className="text-white/80 mb-6">
              These Terms shall be interpreted and governed by the laws of the United States, without 
              regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">13. Changes to Terms</h2>
            <p className="text-white/80 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes by posting the new Terms of Service on this page.
            </p>

            <h2 className="text-2xl font-bold text-mint mb-4">14. Contact Information</h2>
            <p className="text-white/80 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="glass rounded-lg p-4">
              <p className="text-white font-semibold">JULDD Media</p>
              <p className="text-white/80">Email: legal@julddmedia.com</p>
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

export default TermsOfService;