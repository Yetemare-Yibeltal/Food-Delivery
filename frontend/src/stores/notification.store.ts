import { create } from 'zustand';

// ─── Notification Interface ───────────────────────────────────────────────────
export interface INotification {
  _id: string;
  title: string;
  body: string;
  type: 'order_update' | 'promotion' | 'account_alert' | 'newsletter' | 'system';
  isRead: boolean;
  data?: Record<string, unknown>;
  imageUrl?: string;
  actionUrl?: string;
  createdAt: Date;
}

// ─── Notification Store State ─────────────────────────────────────────────────
interface INotificationState {
  notifications: INotification[];
  unreadCount: number;
  isLoading: boolean;
  hasMore: boolean;
  page: number;

  // Actions
  setNotifications: (notifications: INotification[]) => void;
  addNotification: (notification: INotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  setUnreadCount: (count: number) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  appendNotifications: (notifications: INotification[]) => void;
  clearNotifications: () => void;
}

// ─── Notification Store ───────────────────────────────────────────────────────
export const useNotificationStore = create<INotificationState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  hasMore: true,
  page: 1,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    set({ notifications, unreadCount, page: 1 });
  },

  addNotification: (notification) => {
    const state = get();
    const exists = state.notifications.some((n) => n._id === notification._id);
    if (exists) return;

    set({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.isRead ? state.unreadCount : state.unreadCount + 1,
    });
  },

  markAsRead: (id) => {
    const state = get();
    const notification = state.notifications.find((n) => n._id === id);
    if (!notification || notification.isRead) return;

    set({
      notifications: state.notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    });
  },

  markAllAsRead: () => {
    set({
      notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    });
  },

  removeNotification: (id) => {
    const state = get();
    const notification = state.notifications.find((n) => n._id === id);
    set({
      notifications: state.notifications.filter((n) => n._id !== id),
      unreadCount:
        notification && !notification.isRead
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
    });
  },

  setUnreadCount: (unreadCount) => {
    set({ unreadCount });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setHasMore: (hasMore) => {
    set({ hasMore });
  },

  appendNotifications: (newNotifications) => {
    const state = get();
    const existing = new Set(state.notifications.map((n) => n._id));
    const unique = newNotifications.filter((n) => !existing.has(n._id));

    set({
      notifications: [...state.notifications, ...unique],
      page: state.page + 1,
    });
  },

  clearNotifications: () => {
    set({
      notifications: [],
      unreadCount: 0,
      hasMore: true,
      page: 1,
    });
  },
}));

// ─── Selectors ────────────────────────────────────────────────────────────────
export const useNotifications = () => useNotificationStore((state) => state.notifications);
export const useUnreadCount = () => useNotificationStore((state) => state.unreadCount);
export const useNotificationLoading = () => useNotificationStore((state) => state.isLoading);

export default useNotificationStore;
