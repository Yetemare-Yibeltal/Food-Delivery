'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { LoginSchema, type LoginInput } from '@yene/shared';
import { useLogin } from './auth.hooks';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Login Form ───────────────────────────────────────────────────────────────
export const LoginForm = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      platform: 'web',
    },
  });

  const onSubmit = (data: LoginInput): void => {
    login(data);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="heading-lg text-white">Welcome back 👋</h1>
        <p className="text-white/50 text-sm">
          Sign in to your Yene Delivery account
        </p>
        <p className="font-amharic text-white/30 text-xs">
          ወደ የኔ ዴሊቨሪ ይግቡ
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/70">
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
              className="text-red-400 text-xs flex items-center gap-1"
            >
              <span aria-hidden="true">⚠</span>
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-white/70">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
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
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs flex items-center gap-1"
            >
              <span aria-hidden="true">⚠</span>
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-3">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-white/50 cursor-pointer select-none"
          >
            Remember me for 7 days
          </label>
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
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs text-white/30 bg-background">
            or continue with
          </span>
        </div>
      </motion.div>

      {/* Social Login */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn-ghost-premium flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="btn-ghost-premium flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
        >
          <span className="text-base" aria-hidden="true">📱</span>
          Telebirr
        </button>
      </motion.div>

      {/* Register Link */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-white/40"
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Create one free
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default LoginForm;