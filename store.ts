export interface StockItem {
  quantity: number;
  price: number;
}

export interface Sale {
  item: string;
  qty: number;
  total: number;
  date: string;
}

export interface Driver {
  name: string;
  location: string;
  status: 'Active' | 'Dispatched' | 'Offline';
  trips: number;
}

export interface Dispatch {
  id: number;
  driverName: string;
  status: 'Pending' | 'En Route' | 'Completed';
  time: string;
}

export interface Referral {
  id: number;
  patient: string;
  reason: string;
  destination: string;
  status: 'Pending' | 'ACCEPTED' | 'DENIED';
}

export interface MonthlyRecord {
  date: string;
  revenue: number;
}

export const ZMW = new Intl.NumberFormat('en-ZA', { 
  style: 'currency', 
  currency: 'ZMW' 
});

export class HealthStore {
  static getStock(): Record<string, StockItem> {
    return JSON.parse(localStorage.getItem('healthShopStock') || '{}');
  }

  static setStock(stock: Record<string, StockItem>) {
    localStorage.setItem('healthShopStock', JSON.stringify(stock));
  }

  static getSales(): Sale[] {
    return JSON.parse(localStorage.getItem('healthShopSales') || '[]');
  }

  static setSales(sales: Sale[]) {
    localStorage.setItem('healthShopSales', JSON.stringify(sales));
  }

  static getReferrals(): Referral[] {
    return JSON.parse(localStorage.getItem('healthShopReferrals') || '[]');
  }

  static setReferrals(referrals: Referral[]) {
    localStorage.setItem('healthShopReferrals', JSON.stringify(referrals));
  }

  static getDrivers(): Driver[] {
    return JSON.parse(localStorage.getItem('yangoDrivers') || '[]');
  }

  static setDrivers(drivers: Driver[]) {
    localStorage.setItem('yangoDrivers', JSON.stringify(drivers));
  }

  static getDispatches(): Dispatch[] {
    return JSON.parse(localStorage.getItem('dispatchQueue') || '[]');
  }

  static setDispatches(dispatches: Dispatch[]) {
    localStorage.setItem('dispatchQueue', JSON.stringify(dispatches));
  }

  static getMonthlyRecords(): MonthlyRecord[] {
    return JSON.parse(localStorage.getItem('monthlyRecords') || '[]');
  }

  static setMonthlyRecords(records: MonthlyRecord[]) {
    localStorage.setItem('monthlyRecords', JSON.stringify(records));
  }

  static getCurrentDriver(): string {
    return localStorage.getItem('currentAppDriver') || '';
  }

  static setCurrentDriver(name: string) {
    localStorage.setItem('currentAppDriver', name);
  }

  static clearAll() {
    localStorage.clear();
  }
}
