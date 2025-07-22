import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('stripe_session_id', sessionId)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
        } else {
          setOrderDetails(data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mint/20 border-t-mint rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Success Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
          >
            <CheckCircle className="w-24 h-24 text-mint mx-auto" />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Order Successful! 🎉
          </h1>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Thank you for your purchase! Your order has been confirmed and you'll receive 
            an email confirmation shortly.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <motion.div
              className="glass rounded-2xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-mint mb-4">Order Details</h2>
              <div className="space-y-2 text-white/80">
                <p><strong>Order ID:</strong> {orderDetails.id}</p>
                <p><strong>Total:</strong> ${(orderDetails.total_cents / 100).toFixed(2)}</p>
                <p><strong>Status:</strong> {orderDetails.status}</p>
                {orderDetails.customer_email && (
                  <p><strong>Email:</strong> {orderDetails.customer_email}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/shop"
              className="btn-gradient px-8 py-4 rounded-full text-white font-bold flex items-center justify-center space-x-2 text-lg hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Continue Shopping</span>
            </Link>
            
            <Link
              to="/"
              className="glass px-8 py-4 rounded-full text-white font-bold flex items-center justify-center space-x-2 text-lg hover:scale-105 transition-transform"
            >
              <Home className="w-6 h-6" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/60 text-sm">
              Questions about your order? Contact us at{' '}
              <a href="mailto:support@julddmedia.com" className="text-mint hover:underline">
                support@julddmedia.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;