'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ResetPasswordSchema, type ResetPasswordInput } from '@yene/shared';
import { useResetPassword } from './auth.hooks';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Password Strength Indicator ──────────────────────────────────────────────
const getPasswordStrength = (
  password: string,
): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Very weak', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Weak', color: 'bg-orange-500' };
  if (score === 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
  if (score === 4) return { score, label: 'Strong', color: 'bg-green-500' };
  return { score, label: 'Very strong', color: 'bg-emerald-500' };
};

const passwordRequirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

// ─── Reset Password Form ──────────────────────────────────────────────────────
export const ResetPasswordForm = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const token = searchParams.get('token') ?? '';

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email,
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password') ?? '';
  const strength = getPasswordStrength(password);

  const onSubmit = (data: ResetPasswordInput): void => {
    resetPassword(data);
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
          <span className="text-3xl" aria-hidden="true">🔑</span>
        </div>
        <div className="space-y-1">
          <h1 className="heading-lg text-white">Reset password</h1>
          <p className="font-amharic text-white/30 text-xs">የይለፍ ቃልዎን ዳግም ያስጀምሩ</p>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Create a new strong password for your account.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Hidden fields */}
        <input type="hidden" {...register('email')} />
        <input type="hidden" {...register('token')} />

        {/* New Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-white/70">
            New password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
              {...register('password')}
              className={cn(
                'w-full pl-11 pr-12 py-3.5 rounded-xl',
                'input-premium text-white text-sm',
                errors.password && 'border-red-500/50',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}

          {/* Strength indicator */}
          {password.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-all duration-300',
                        i <= strength.score ? strength.color : 'bg-white/10',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className={cn('text-xs font-medium', strength.score >= 4 ? 'text-green-400' : strength.score >= 3 ? 'text-yellow-400' : 'text-red-400')}>
                  {strength.label}
                </span>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 gap-1">
                {passwordRequirements.map((req) => {
                  const met = req.test(password);
                  return (
                    <div key={req.label} className="flex items-center gap-2">
                      <div className={cn(
                        'w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200',
                        met ? 'bg-green-500' : 'bg-white/10',
                      )}>
                        {met && <Check className="w-2 h-2 text-white" aria-hidden="true" />}
                      </div>
                      <span className={cn(
                        'text-[10px] transition-colors duration-200',
                        met ? 'text-green-400' : 'text-white/30',
                      )}>
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-white/70">
            Confirm new password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat your new password"
              {...register('confirmPassword')}
              className={cn(
                'w-full pl-11 pr-12 py-3.5 rounded-xl',
                'input-premium text-white text-sm',
                errors.confirmPassword && 'border-red-500/50',
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isPending || strength.score < 3}
          whileHover={{ scale: isPending ? 1 : 1.01 }}
          whileTap={{ scale: isPending ? 1 : 0.99 }}
          className={cn(
            'w-full py-3.5 rounded-xl',
            'btn-premium text-white font-semibold text-sm',
            'flex items-center justify-center gap-2',
            (isPending || strength.score < 3) && 'opacity-60 cursor-not-allowed',
          )}
        >
          {isPending ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Resetting password...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ResetPasswordForm;