import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (
  date: string | Date,
  formatStr: string = "dd.MM.yyyy"
): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date provided to formatDate:", date);
      return "Неверная дата";
    }
    
    return format(dateObj, formatStr, { locale: ru });
  } catch (error) {
    console.warn("Error formatting date:", error, "Input:", date);
    return "Неверная дата";
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, "dd.MM.yyyy HH:mm");
};

export const formatTime = (date: string | Date): string => {
  return formatDate(date, "HH:mm");
};

export const formatCurrency = (
  amount: number,
  currency: string = "RUB"
): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ru-RU").format(num);
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
