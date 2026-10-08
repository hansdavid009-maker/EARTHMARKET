export interface Product {
  id: string;
  slug: string;
  name: string;
  nameZh?: string;
  category: 'Travel' | 'Fashion' | 'Gadget' | 'Souvenir';
  priceIdr: number;
  priceCny: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  priceIdr: number;
  priceCny: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  postalCode: string;
  paymentMethod: 'Bank Transfer' | 'E-Wallet (GoPay/OVO)' | 'Credit Card' | 'WeChat Pay / Alipay';
  items: OrderItem[];
  subtotalIdr: number;
  shippingIdr: number;
  totalIdr: number;
  totalCny: number;
  status: 'Pending' | 'Paid' | 'Processing' | 'Completed' | 'Shipped';
}

export interface ExchangeTransaction {
  id: string;
  date: string;
  fromCurrency: 'IDR' | 'CNY';
  toCurrency: 'CNY' | 'IDR';
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  accountName?: string;
  accountNumber?: string;
}

export interface DictionaryWord {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningId: string;
  category: 'Greetings' | 'Food' | 'Shopping' | 'Transportation' | 'Hotel' | 'Airport' | 'Conversation' | 'Money' | 'Emergency' | 'Business';
  exampleZh: string;
  examplePinyin: string;
  exampleId: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionSuggestions?: string[];
  productCard?: Product;
}
