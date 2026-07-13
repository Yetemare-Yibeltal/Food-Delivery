'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, RefreshCw, Mail } from 'lucide-react';
import { useVerifyOtp, useResendOtp } from './auth.hooks';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── OTP Form Component ───────────────────────────────────────────────────────
export const OtpForm = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const purpose = searchParams.get('purpose') ?? 'email_verification';

  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = React.useState(60);
  const [canResend, setCanResend] = React.useState(false);
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  // Countdown timer
  React.useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      // Handle paste
      const digits = value.slice(0, 6 - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // Auto submit when all digits filled
    const filledOtp = [...newOtp];
    if (filledOtp.every((d) => d !== '') && filledOtp.join('').length === 6) {
      handleSubmit(filledOtp.join(''));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (otpCode: string): void => {
    if (otpCode.length !== 6 || !email) return;

    verifyOtp({
      email,
      otp: otpCode,
      purpose: purpose as 'email_verification' | 'phone_verification' | 'password_reset' | 'two_factor_auth',
    });
  };

  const handleResend = (): void => {
    if (!canResend || isResending) return;

    resendOtp({
      email,
      purpose: purpose as 'email_verification' | 'phone_verification' | 'password_reset' | 'two_factor_auth',
    });

    setOtp(Array(6).fill(''));
    setCountdown(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const purposeLabels: Record<string, { title: string; description: string; titleAm: string }> = {
    email_verification: {
      title: 'Verify your email',
      titleAm: 'ኢሜልዎን ያረጋግጡ',
      description: 'We sent a 6-digit code to verify your email address.',
    },
    password_reset: {
      title: 'Reset password',
      titleAm: 'የይለፍ ቃል ዳግም ያስጀምሩ',
      description: 'We sent a 6-digit code to reset your password.',
    },
    phone_verification: {
      title: 'Verify your phone',
      titleAm: 'ስልክዎን ያረጋግጡ',
      description: 'We sent a 6-digit code to verify your phone number.',
    },
    two_factor_auth: {
      title: 'Two-factor auth',
      titleAm: 'ሁለት-ደረጃ ማረጋገጫ',
      description: 'Enter the 6-digit code from your authenticator app.',
    },
  };

  const currentPurpose = purposeLabels[purpose] ?? purposeLabels['email_verification']!;
  const filledCount = otp.filter((d) => d !== '').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="heading-lg text-white">{currentPurpose.title}</h1>
          <p className="font-amharic text-white/30 text-xs">{currentPurpose.titleAm}</p>
        </div>
        <p className="text-white/50 text-sm text-center leading-relaxed">
          {currentPurpose.description}
          {email && (
            <>
              <br />
              <span className="text-primary font-medium">{email}</span>
            </>
          )}
        </p>
      </motion.div>

      {/* OTP Input Boxes */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <input
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                className={cn(
                  'w-12 h-14 text-center text-xl font-black rounded-xl',
                  'transition-all duration-200',
                  'input-premium text-white',
                  digit
                    ? 'border-primary bg-primary/10 glow-primary'
                    : 'border-white/10 bg-white/5',
                  'focus:border-primary focus:bg-primary/10',
                )}
                aria-label={`OTP digit ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                digit ? 'w-6 bg-primary' : 'w-3 bg-white/10',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="space-y-4">
        <motion.button
          type="button"
          onClick={() => handleSubmit(otp.join(''))}
          disabled={filledCount < 6 || isVerifying}
          whileHover={{ scale: filledCount === 6 && !isVerifying ? 1.01 : 1 }}
          whileTap={{ scale: filledCount === 6 && !isVerifying ? 0.99 : 1 }}
          className={cn(
            'w-full py-3.5 rounded-xl',
            'btn-premium text-white font-semibold text-sm',
            'flex items-center justify-center gap-2',
            (filledCount < 6 || isVerifying) && 'opacity-50 cursor-not-allowed',
          )}
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </>
          ) : (
            <>
              Verify Code
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </motion.button>

        {/* Resend */}
        <div className="text-center space-y-1">
          <p className="text-white/40 text-sm">
            {canResend ? (
              <>
                Did not receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className={cn(
                    'text-primary hover:text-primary/80 font-semibold transition-colors',
                    'inline-flex items-center gap-1',
                    isResending && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    'Resend code'
                  )}
                </button>
              </>
            ) : (
              <>
                Resend code in{' '}
                <span className="text-primary font-mono font-bold">
                  {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                  {String(countdown % 60).padStart(2, '0')}
                </span>
              </>
            )}
          </p>
        </div>
      </motion.div>

      {/* Back */}
      <motion.div variants={itemVariants} className="text-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-white/30 hover:text-white/50 transition-colors"
        >
          ← Go back
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OtpForm;