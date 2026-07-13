'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ChefHat,
  Bike,
} from 'lucide-react';
import Link from 'next/link';
import { RegisterSchema, type RegisterInput, UserRole } from '@yene/shared';
import { useRegister } from './auth.hooks';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Role Option ──────────────────────────────────────────────────────────────
interface RoleOption {
  value: UserRole;
  label: string;
  labelAm: string;
  icon: React.ReactNode;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    value: UserRole.CUSTOMER,
    label: 'Customer',
    labelAm: 'ደንበኛ',
    icon: <span className="text-lg" aria-hidden="true">🛒</span>,
    description: 'Order food from restaurants',
  },
  {
    value: UserRole.RESTAURANT_OWNER,
    label: 'Restaurant Owner',
    labelAm: 'የምግብ ቤት ባለቤት',
    icon: <ChefHat className="w-5 h-5" aria-hidden="true" />,
    description: 'List and manage your restaurant',
  },
  {
    value: UserRole.RIDER,
    label: 'Delivery Rider',
    labelAm: 'ዴሊቨሪ ደላላ',
    icon: <Bike className="w-5 h-5" aria-hidden="true" />,
    description: 'Deliver orders and earn money',
  },
];

// ─── Register Form Component ──────────────────────────────────────────────────
export const RegisterForm = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: UserRole.CUSTOMER,
      agreeToTerms: false,
    },
  });

  const selectedRole = watch('role');
  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = (data: RegisterInput): void => {
    register(data);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="heading-lg text-white">
          Create account 🚀
        </h1>
        <p className="text-white/50 text-sm">
          Join thousands of Ethiopians on Yene Delivery
        </p>
        <p className="font-amharic text-white/30 text-xs">
          ወደ የኔ ዴሊቨሪ ይቀላቀሉ
        </p>
      </motion.div>

      {/* Role Selection */}
      <motion.div variants={itemVariants} className="space-y-3">
        <p className="text-sm font-medium text-white/70">I want to join as:</p>
        <div className="grid grid-cols-3 gap-2">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue('role', option.value)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl',
                'border transition-all duration-200 text-center',
                selectedRole === option.value
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-white/10 bg-white/3 text-white/50 hover:border-white/20 hover:text-white/70',
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                selectedRole === option.value ? 'bg-primary/20 text-primary' : 'bg-white/5',
              )}>
                {option.icon}
              </div>
              <span className="text-xs font-medium leading-tight">{option.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-xs font-medium text-white/60">
              First Name
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Selam"
                {...registerField('firstName')}
                className={cn(
                  'w-full pl-9 pr-3 py-3 rounded-xl text-sm',
                  'input-premium text-white',
                  errors.firstName && 'border-red-500/50',
                )}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-400 text-[10px]">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-xs font-medium text-white/60">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Yibeltal"
                {...registerField('lastName')}
                className={cn(
                  'w-full pl-9 pr-3 py-3 rounded-xl text-sm',
                  'input-premium text-white',
                  errors.lastName && 'border-red-500/50',
                )}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-400 text-[10px]">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-white/60">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Mail className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="selam@example.com"
              {...registerField('email')}
              className={cn(
                'w-full pl-11 pr-4 py-3 rounded-xl text-sm',
                'input-premium text-white',
                errors.email && 'border-red-500/50',
              )}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-white/60">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Phone className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+251912345678"
              {...registerField('phone')}
              className={cn(
                'w-full pl-11 pr-4 py-3 rounded-xl text-sm',
                'input-premium text-white',
                errors.phone && 'border-red-500/50',
              )}
            />
          </div>
          {errors.phone ? (
            <p className="text-red-400 text-xs">{errors.phone.message}</p>
          ) : (
            <p className="text-white/25 text-[10px]">Format: +2519XXXXXXXX or 09XXXXXXXX</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-medium text-white/60">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min 8 characters"
              {...registerField('password')}
              className={cn(
                'w-full pl-11 pr-12 py-3 rounded-xl text-sm',
                'input-premium text-white',
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
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-medium text-white/60">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat your password"
              {...registerField('confirmPassword')}
              className={cn(
                'w-full pl-11 pr-12 py-3 rounded-xl text-sm',
                'input-premium text-white',
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

        {/* Terms */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...registerField('agreeToTerms')}
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-primary cursor-pointer shrink-0"
            />
            <label
              htmlFor="agreeToTerms"
              className="text-xs text-white/50 cursor-pointer leading-relaxed"
            >
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-400 text-xs">{errors.agreeToTerms.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isPending || !agreeToTerms}
          whileHover={{ scale: isPending ? 1 : 1.01 }}
          whileTap={{ scale: isPending ? 1 : 0.99 }}
          className={cn(
            'w-full py-3.5 rounded-xl mt-2',
            'btn-premium text-white font-semibold text-sm',
            'flex items-center justify-center gap-2',
            (isPending || !agreeToTerms) && 'opacity-60 cursor-not-allowed',
          )}
        >
          {isPending ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Login Link */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-white/40"
      >
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default RegisterForm;