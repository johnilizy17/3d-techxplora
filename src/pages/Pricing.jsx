import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Check,
    X,
    Zap,
    Crown,
    Sparkles,
    Users,
    BookOpen,
    Award,
    TrendingUp,
    Shield,
    Headphones,
    Rocket
} from 'lucide-react';

const Pricing = () => {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

    const plans = [
        {
            name: 'Free',
            icon: BookOpen,
            price: { monthly: 0, annual: 0 },
            description: 'Perfect for getting started',
            color: 'from-gray-500 to-gray-600',
            borderColor: 'border-gray-300 dark:border-gray-700',
            features: [
                { text: 'Access to 5 free courses', included: true },
                { text: 'Basic quizzes', included: true },
                { text: 'Community support', included: true },
                { text: 'Progress tracking', included: true },
                { text: 'Mobile access', included: true },
                { text: 'Advanced analytics', included: false },
                { text: 'Certificates', included: false },
                { text: 'Priority support', included: false },
            ],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Pro',
            icon: Zap,
            price: { monthly: 2999, annual: 29990 },
            description: 'For serious learners',
            color: 'from-blue-500 to-indigo-600',
            borderColor: 'border-blue-500',
            features: [
                { text: 'Unlimited course access', included: true },
                { text: 'Advanced quizzes & assessments', included: true },
                { text: 'AI-powered learning insights', included: true },
                { text: 'Downloadable certificates', included: true },
                { text: 'Priority email support', included: true },
                { text: 'Offline mode', included: true },
                { text: 'Custom learning paths', included: true },
                { text: 'Ad-free experience', included: true },
            ],
            cta: 'Start Pro Trial',
            popular: true
        },
        {
            name: 'Enterprise',
            icon: Crown,
            price: { monthly: 'Custom', annual: 'Custom' },
            description: 'For schools & organizations',
            color: 'from-purple-500 to-pink-600',
            borderColor: 'border-purple-500 dark:border-purple-600',
            features: [
                { text: 'Everything in Pro', included: true },
                { text: 'Unlimited team members', included: true },
                { text: 'Custom branding', included: true },
                { text: 'Dedicated account manager', included: true },
                { text: 'Advanced analytics dashboard', included: true },
                { text: 'API access', included: true },
                { text: 'SSO & SAML integration', included: true },
                { text: '24/7 phone support', included: true },
            ],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    const benefits = [
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your data is encrypted and protected with industry-standard security'
        },
        {
            icon: TrendingUp,
            title: 'Track Progress',
            description: 'Monitor your learning journey with detailed analytics and insights'
        },
        {
            icon: Award,
            title: 'Earn Certificates',
            description: 'Get recognized for your achievements with verified certificates'
        },
        {
            icon: Headphones,
            title: 'Expert Support',
            description: 'Our team is here to help you succeed every step of the way'
        }
    ];

    const faqs = [
        {
            question: 'Can I switch plans later?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, and bank transfers for Nigerian customers.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Yes! Pro plan comes with a 14-day free trial. No credit card required to start.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Absolutely. You can cancel your subscription at any time with no penalties or fees.'
        },
        {
            question: 'Do you offer student discounts?',
            answer: 'Yes! Students with valid ID can get 20% off on Pro plans. Contact support for details.'
        },
        {
            question: 'What happens after my trial ends?',
            answer: 'You\'ll be automatically enrolled in the free plan. You can upgrade anytime to continue with Pro features.'
        }
    ];

    const formatPrice = (price) => {
        if (typeof price === 'string') return price;
        return `₦${price.toLocaleString()}`;
    };

    const getSavings = (plan) => {
        if (typeof plan.price.annual === 'string') return null;
        const monthlyCost = plan.price.monthly * 12;
        const savings = monthlyCost - plan.price.annual;
        const percentage = Math.round((savings / monthlyCost) * 100);
        return { amount: savings, percentage };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
                    
                    <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                                <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                    Simple, Transparent Pricing
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight">
                                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Learning Path</span>
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                                Start free, upgrade when you're ready. All plans include access to our world-class learning platform.
                            </p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center gap-4 pt-4">
                                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    Monthly
                                </span>
                                <button
                                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                                    className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
                                >
                                    <motion.div
                                        animate={{ x: billingCycle === 'annual' ? 28 : 2 }}
                                        className="absolute top-1 w-5 h-5 rounded-full bg-blue-600 shadow-lg"
                                    />
                                </button>
                                <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    Annual
                                </span>
                                {billingCycle === 'annual' && (
                                    <span className="ml-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
                                        Save 17%
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => {
                            const savings = getSavings(plan);
                            const Icon = plan.icon;

                            return (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative rounded-3xl p-8 ${
                                        plan.popular
                                            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border-2 ' + plan.borderColor + ' shadow-2xl scale-105'
                                            : 'bg-white dark:bg-gray-900 border-2 ' + plan.borderColor
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {/* Header */}
                                        <div className="space-y-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                                                    {plan.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="space-y-2">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-gray-900 dark:text-white">
                                                    {formatPrice(plan.price[billingCycle])}
                                                </span>
                                                {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                                                    </span>
                                                )}
                                            </div>
                                            {billingCycle === 'annual' && savings && (
                                                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                                                    Save {formatPrice(savings.amount)} per year
                                                </p>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => plan.name === 'Enterprise' ? navigate('/contact') : navigate('/auth/signup')}
                                            className={`w-full py-4 rounded-xl font-black uppercase text-sm tracking-wider transition-all ${
                                                plan.popular
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105'
                                                    : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                                            }`}
                                        >
                                            {plan.cta}
                                        </button>

                                        {/* Features */}
                                        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <Check size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    ) : (
                                                        <X size={20} className="text-gray-300 dark:text-gray-700 shrink-0 mt-0.5" />
                                                    )}
                                                    <span className={`text-sm font-medium ${
                                                        feature.included
                                                            ? 'text-gray-900 dark:text-white'
                                                            : 'text-gray-400 dark:text-gray-600'
                                                    }`}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-gray-100 dark:bg-gray-900 py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-4">
                                Why Choose <span className="text-blue-600 dark:text-blue-400">TechXplora</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                                Join thousands of learners who trust TechXplora for their educational journey
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            <Icon size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {benefit.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-4">
                            Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                            Got questions? We've got answers
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
                            >
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <Rocket size={48} className="mx-auto text-white" />
                            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase italic">
                                Ready to Start Learning?
                            </h2>
                            <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
                                Join TechXplora today and unlock your potential with our comprehensive learning platform
                            </p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <div
                                onClick={() => navigate('/auth/signup')}
                                className="px-8 py-4 rounded-xl bg-white text-blue-600 font-black uppercase text-sm tracking-wider hover:bg-gray-100 transition-all shadow-xl"
                            >
                                Start Free Trial
                            </div>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-black uppercase text-sm tracking-wider hover:bg-white/10 transition-all"
                            >
                                Contact Sales
                            </button>
                        </div>

                        <p className="text-sm text-blue-100 font-medium">
                            No credit card required • Cancel anytime • 14-day free trial
                        </p>
                    </div>
                </div>
            </div>
       
    );
};

export default Pricing;
