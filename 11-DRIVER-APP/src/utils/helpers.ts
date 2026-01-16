// Validation utilities
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidOtp = (otp: string): boolean => {
  return /^[0-9]{6}$/.test(otp);
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    return `+${cleaned}`;
  }
  return cleaned;
};

// Distance calculation (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Time utilities
export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const time = new Date(date);
  const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return `FJD $${amount.toFixed(2)}`;
};
