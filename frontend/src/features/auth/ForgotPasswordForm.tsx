'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@yene/shared';
import { useForgotPassword } from './auth.hooks';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Forgot Password Form ─────────────────────────────────────────────────────
export const ForgotPasswordForm = (): React.JSX.Element => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const email = watch('email');

  const onSubmit = (data: ForgotPasswordInput): void => {
    forgotPassword(data);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-3xl" aria-hidden="true">🔐</span>
        </div>
        <div className="space-y-1">
          <h1 className="heading-lg text-white">Forgot password?</h1>
          <p className="font-amharic text-white/30 text-xs">
            የይለፍ ቃልዎን ረስተዋል?
          </p>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          No worries. Enter your email address and we will send you a code to
          reset your password.
        </p>
      </motion.div>

      {!isSuccess ? (
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white/70"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email')}
                className={cn(
                  'w-full pl-11 pr-4 py-3.5 rounded-xl',
                  'input-premium text-white text-sm',
                  errors.email && 'border-red-500/50',
                )}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.01 }}
            whileTap={{ scale: isPending ? 1 : 0.99 }}
            className={cn(
              'w-full py-3.5 rounded-xl',
              'btn-premium text-white font-semibold text-sm',
              'flex items-center justify-center gap-2',
              isPending && 'opacity-70 cursor-not-allowed',
            )}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending code...
              </>
            ) : (
              <>
                Send Reset Code
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto">
            <span className="text-3xl" aria-hidden="true">✅</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Check your email</h3>
            <p className="text-white/50 text-sm mt-1">
              We sent a reset code to{' '}
              <span className="text-primary font-medium">{email}</span>
            </p>
          </div>
          <p className="text-white/30 text-xs">
            Did not receive it? Check your spam folder or{' '}
            <button
              type="button"
              onClick={() => forgotPassword({ email })}
              className="text-primary hover:underline"
            >
              try again
            </button>
          </p>
        </motion.div>
      )}

      {/* Back to Login */}
      <motion.div variants={itemVariants}>
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to sign in
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordForm;