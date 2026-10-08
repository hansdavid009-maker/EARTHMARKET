import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIdr(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp ');
}

export function formatCny(amount: number): string {
  return `¥ ${Math.round(amount).toLocaleString('en-US')}`;
}

export function calculateIdrToCny(idrAmount: number, rate: number, fee: number = 0): number {
  const netIdr = Math.max(0, idrAmount - fee);
  return Math.floor(netIdr / rate);
}

export function calculateCnyToIdr(cnyAmount: number, rate: number, fee: number = 0): number {
  return Math.round(cnyAmount * rate) + fee;
}
