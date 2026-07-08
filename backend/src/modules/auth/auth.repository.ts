import type { FilterQuery, UpdateQuery } from 'mongoose';
import { UserModel, type IUserDocument } from './auth.schema';
import { logError } from '../../shared/utils/response.utils';
import { DatabaseError } from '../../shared/errors/AppError';
import type { UserRole, UserStatus } from '@yene/shared';

// ─── Auth Repository ──────────────────────────────────────────────────────────
export class AuthRepository {
  // ─── Find user by email (includes password) ─────────────────────────────
  async findByEmailWithPassword(email: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({ email: email.toLowerCase().trim() })
        .select('+password')
        .lean(false);
    } catch (error) {
      logError('AuthRepository.findByEmailWithPassword', error);
      throw new DatabaseError('Failed to find user by email');
    }
  }

  // ─── Find user by email (excludes password) ──────────────────────────────
  async findByEmail(email: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({
        email: email.toLowerCase().trim(),
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('AuthRepository.findByEmail', error);
      throw new DatabaseError('Failed to find user by email');
    }
  }

  // ─── Find user by ID ─────────────────────────────────────────────────────
  async findById(id: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({
        _id: id,
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('AuthRepository.findById', error);
      throw new DatabaseError('Failed to find user by ID');
    }
  }

  // ─── Find user by ID with password ──────────────────────────────────────
  async findByIdWithPassword(id: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findById(id).select('+password');
    } catch (error) {
      logError('AuthRepository.findByIdWithPassword', error);
      throw new DatabaseError('Failed to find user by ID');
    }
  }

  // ─── Find user by phone ──────────────────────────────────────────────────
  async findByPhone(phone: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({
        phone,
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('AuthRepository.findByPhone', error);
      throw new DatabaseError('Failed to find user by phone');
    }
  }

  // ─── Find user by referral code ──────────────────────────────────────────
  async findByReferralCode(code: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({ referralCode: code });
    } catch (error) {
      logError('AuthRepository.findByReferralCode', error);
      throw new DatabaseError('Failed to find user by referral code');
    }
  }

  // ─── Find user by password reset token ───────────────────────────────────
  async findByPasswordResetToken(hashedToken: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date() },
        deletedAt: { $exists: false },
      }).select('+passwordResetToken +passwordResetExpires');
    } catch (error) {
      logError('AuthRepository.findByPasswordResetToken', error);
      throw new DatabaseError('Failed to find user by reset token');
    }
  }

  // ─── Create user ─────────────────────────────────────────────────────────
  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    role?: UserRole;
    gender?: string;
    dateOfBirth?: Date;
    authProvider?: string;
    googleId?: string;
    referralCode?: string;
    referredBy?: string;
  }): Promise<IUserDocument> {
    try {
      const user = new UserModel({
        ...data,
        email: data.email.toLowerCase().trim(),
      });
      return await user.save();
    } catch (error) {
      logError('AuthRepository.create', error);
      throw new DatabaseError('Failed to create user');
    }
  }

  // ─── Update user ─────────────────────────────────────────────────────────
  async update(id: string, data: UpdateQuery<IUserDocument>): Promise<IUserDocument | null> {
    try {
      return await UserModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      logError('AuthRepository.update', error);
      throw new DatabaseError('Failed to update user');
    }
  }

  // ─── Save OTP ─────────────────────────────────────────────────────────────
  async saveOtp(
    id: string,
    data: {
      hashedCode: string;
      purpose: string;
      expiresAt: Date;
    },
  ): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $set: {
          otp: {
            hashedCode: data.hashedCode,
            purpose: data.purpose,
            expiresAt: data.expiresAt,
            attempts: 0,
          },
        },
      });
    } catch (error) {
      logError('AuthRepository.saveOtp', error);
      throw new DatabaseError('Failed to save OTP');
    }
  }

  // ─── Increment OTP attempts ───────────────────────────────────────────────
  async incrementOtpAttempts(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $inc: { 'otp.attempts': 1 },
      });
    } catch (error) {
      logError('AuthRepository.incrementOtpAttempts', error);
      throw new DatabaseError('Failed to increment OTP attempts');
    }
  }

  // ─── Clear OTP ────────────────────────────────────────────────────────────
  async clearOtp(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $unset: { otp: 1 },
      });
    } catch (error) {
      logError('AuthRepository.clearOtp', error);
      throw new DatabaseError('Failed to clear OTP');
    }
  }

  // ─── Verify email ─────────────────────────────────────────────────────────
  async verifyEmail(id: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        {
          $set: {
            isEmailVerified: true,
            status: 'active',
          },
          $unset: {
            otp: 1,
            emailVerificationToken: 1,
            emailVerificationExpires: 1,
          },
        },
        { new: true },
      );
    } catch (error) {
      logError('AuthRepository.verifyEmail', error);
      throw new DatabaseError('Failed to verify email');
    }
  }

  // ─── Save password reset token ────────────────────────────────────────────
  async savePasswordResetToken(id: string, hashedToken: string, expiresAt: Date): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $set: {
          passwordResetToken: hashedToken,
          passwordResetExpires: expiresAt,
        },
      });
    } catch (error) {
      logError('AuthRepository.savePasswordResetToken', error);
      throw new DatabaseError('Failed to save password reset token');
    }
  }

  // ─── Reset password ───────────────────────────────────────────────────────
  async resetPassword(id: string, hashedPassword: string): Promise<IUserDocument | null> {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        {
          $set: {
            password: hashedPassword,
            passwordChangedAt: new Date(),
            loginAttempts: 0,
          },
          $unset: {
            passwordResetToken: 1,
            passwordResetExpires: 1,
            lockUntil: 1,
          },
        },
        { new: true },
      );
    } catch (error) {
      logError('AuthRepository.resetPassword', error);
      throw new DatabaseError('Failed to reset password');
    }
  }

  // ─── Update last login ────────────────────────────────────────────────────
  async updateLastLogin(id: string, ip: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $set: {
          lastLoginAt: new Date(),
          lastLoginIp: ip,
          loginAttempts: 0,
        },
        $unset: { lockUntil: 1 },
      });
    } catch (error) {
      logError('AuthRepository.updateLastLogin', error);
      throw new DatabaseError('Failed to update last login');
    }
  }

  // ─── Add device token ─────────────────────────────────────────────────────
  async addDeviceToken(id: string, token: string, platform: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $addToSet: {
          deviceTokens: { token, platform, addedAt: new Date() },
        },
      });
    } catch (error) {
      logError('AuthRepository.addDeviceToken', error);
      throw new DatabaseError('Failed to add device token');
    }
  }

  // ─── Remove device token ──────────────────────────────────────────────────
  async removeDeviceToken(id: string, token: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $pull: { deviceTokens: { token } },
      });
    } catch (error) {
      logError('AuthRepository.removeDeviceToken', error);
      throw new DatabaseError('Failed to remove device token');
    }
  }

  // ─── Soft delete user ─────────────────────────────────────────────────────
  async softDelete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $set: {
          deletedAt: new Date(),
          status: 'inactive',
          email: `deleted_${Date.now()}_${id}@deleted.com`,
        },
      });
    } catch (error) {
      logError('AuthRepository.softDelete', error);
      throw new DatabaseError('Failed to delete user');
    }
  }

  // ─── Check if email exists ────────────────────────────────────────────────
  async emailExists(email: string): Promise<boolean> {
    try {
      const count = await UserModel.countDocuments({
        email: email.toLowerCase().trim(),
        deletedAt: { $exists: false },
      });
      return count > 0;
    } catch (error) {
      logError('AuthRepository.emailExists', error);
      throw new DatabaseError('Failed to check email existence');
    }
  }

  // ─── Check if phone exists ────────────────────────────────────────────────
  async phoneExists(phone: string): Promise<boolean> {
    try {
      const count = await UserModel.countDocuments({
        phone,
        deletedAt: { $exists: false },
      });
      return count > 0;
    } catch (error) {
      logError('AuthRepository.phoneExists', error);
      throw new DatabaseError('Failed to check phone existence');
    }
  }

  // ─── Find users with filter ───────────────────────────────────────────────
  async findMany(
    filter: FilterQuery<IUserDocument>,
    options: {
      page?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
      select?: string;
    } = {},
  ): Promise<{ users: IUserDocument[]; total: number }> {
    try {
      const page = options.page ?? 1;
      const limit = options.limit ?? 10;
      const skip = (page - 1) * limit;
      const sort = options.sort ?? { createdAt: -1 };

      const [users, total] = await Promise.all([
        UserModel.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .select(options.select ?? ''),
        UserModel.countDocuments(filter),
      ]);

      return { users, total };
    } catch (error) {
      logError('AuthRepository.findMany', error);
      throw new DatabaseError('Failed to find users');
    }
  }

  // ─── Update OTP resend info ───────────────────────────────────────────────
  async updateOtpResendInfo(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $inc: { 'otp.resendCount': 1 },
        $set: { 'otp.lastResendAt': new Date() },
      });
    } catch (error) {
      logError('AuthRepository.updateOtpResendInfo', error);
      throw new DatabaseError('Failed to update OTP resend info');
    }
  }

  // ─── Update user status ───────────────────────────────────────────────────
  async updateStatus(
    id: string,
    status: UserStatus,
    reason?: string,
  ): Promise<IUserDocument | null> {
    try {
      const updateData: UpdateQuery<IUserDocument> = {
        $set: { status },
      };

      if (status === 'suspended' && reason) {
        updateData.$set = {
          ...updateData.$set,
          suspensionReason: reason,
          suspendedAt: new Date(),
        };
      }

      return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      logError('AuthRepository.updateStatus', error);
      throw new DatabaseError('Failed to update user status');
    }
  }
}

export const authRepository = new AuthRepository();
export default authRepository;
