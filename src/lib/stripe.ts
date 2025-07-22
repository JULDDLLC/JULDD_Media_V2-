import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Demo mode when no Stripe key is configured
const DEMO_MODE = !stripePublishableKey;

export const stripe = stripePublishableKey ? await loadStripe(stripePublishableKey) : null;

export const createCheckoutSession = async (priceId: string, productName: string) => {
  if (DEMO_MODE) {
    // Demo mode - show alert instead of real checkout
    alert(`🛒 Demo Mode\n\nWould redirect to Stripe checkout for:\n${productName}\n\nPrice ID: ${priceId}\n\nTo enable real payments:\n1. Add VITE_STRIPE_PUBLISHABLE_KEY to .env\n2. Deploy the Supabase edge functions\n3. Configure your Stripe webhook`);
    return;
  }

  try {
    // Call our Supabase edge function to create checkout session
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        priceId,
        productName,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/shop`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    if (stripe && sessionId) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Unable to start checkout. Please try again.');
  }
};