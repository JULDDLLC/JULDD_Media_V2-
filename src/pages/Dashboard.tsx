import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Mail, DollarSign, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  newsletterSubscribers: number;
  totalProducts: number;
  recentOrders: Array<{
    id: string;
    customer_email: string;
    total_cents: number;
    created_at: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    newsletterSubscribers: 0,
    totalProducts: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch newsletter subscribers
        const { data: newsletters } = await supabase
          .from('newsletter')
          .select('id');

        // Fetch products
        const { data: products } = await supabase
          .from('products')
          .select('id')
          .eq('is_active', true);

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => sum + order.total_cents, 0) || 0;
        const newsletterSubscribers = newsletters?.length || 0;
        const totalProducts = products?.length || 0;
        const recentOrders = orders?.slice(0, 5) || [];

        setStats({
          totalOrders,
          totalRevenue,
          newsletterSubscribers,
          totalProducts,
          recentOrders
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 100).toFixed(2)}`,
      icon: DollarSign,
      color: 'from-mint to-mint/80',
      change: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: BarChart3,
      color: 'from-pink to-pink/80',
      change: '+8.2%'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers.toString(),
      icon: Mail,
      color: 'from-blue-400 to-blue-500',
      change: '+15.7%'
    },
    {
      title: 'Active Products',
      value: stats.totalProducts.toString(),
      icon: Eye,
      color: 'from-purple-400 to-purple-500',
      change: '+3.1%'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mint/20 border-t-mint rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Dashboard
          </h1>
          <p className="text-white/80 text-lg">
            Welcome back! Here's what's happening with JULDD Media.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-mint text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-white/70 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gradient mb-6">Recent Orders</h2>
          
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">No orders yet</p>
              <p className="text-white/40 text-sm mt-2">
                Orders will appear here once customers start purchasing
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/70 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 text-white/70 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-white/70 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-white/70 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">
                        {order.customer_email || 'Guest'}
                      </td>
                      <td className="py-3 px-4 text-mint font-semibold">
                        ${(order.total_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-mint/20 text-mint">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 text-center">
            <Users className="w-12 h-12 text-mint mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Manage Users</h3>
            <p className="text-white/70 text-sm mb-4">
              View and manage customer accounts
            </p>
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">
              View Users
            </button>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <BarChart3 className="w-12 h-12 text-pink mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
            <p className="text-white/70 text-sm mb-4">
              Detailed insights and reports
            </p>
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">
              View Analytics
            </button>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Manage email campaigns
            </p>
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">
              Send Campaign
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;