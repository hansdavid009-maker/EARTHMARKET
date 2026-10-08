# PRD --- Platform Belanja & Penukaran Rupiah ke Yuan

**Nama sementara:** RedMandarin\
**Platform:** Desktop-first Web Application\
**Framework:** Next.js\
**Styling:** Tailwind CSS\
**Bahasa:** Indonesia + Mandarin\
**Mata uang:** IDR (Rupiah) & CNY (Chinese Yuan/Renminbi)

------------------------------------------------------------------------

## 1. Product Overview

### 1.1 Tujuan Produk

Membangun website terpadu yang memungkinkan pengguna untuk:

1.  Berbelanja produk yang berkaitan dengan kebutuhan perjalanan/bisnis
    ke China.
2.  Melihat harga dalam Rupiah (IDR) dan Yuan (CNY).
3.  Melakukan simulasi/penukaran Rupiah → Yuan.
4.  Melakukan checkout dan pembayaran.
5.  Mempelajari kosakata Bahasa Mandarin melalui fitur kamus.
6.  Bertanya kepada chatbot mengenai produk, transaksi, bahasa Mandarin,
    maupun informasi terkait China.
7.  Mengakses seluruh fitur melalui dashboard yang sederhana dan mudah
    digunakan.

### 1.2 Target User

**Primary user:** - Wisatawan Indonesia yang akan pergi ke China. -
Pelajar yang belajar Mandarin. - Pebisnis yang melakukan transaksi
dengan China. - Pengguna yang membutuhkan konversi IDR ↔ CNY. - Pengguna
yang ingin membeli produk sebelum melakukan perjalanan.

**Secondary user:** - Pengguna yang tertarik belajar Mandarin. -
Pengguna yang membutuhkan informasi harga dalam CNY.

------------------------------------------------------------------------

## 2. Product Vision

> **"Satu platform untuk belanja, menukar Rupiah ke Yuan, dan memahami
> Bahasa Mandarin."**

Website harus terasa seperti kombinasi:

**E-commerce + Currency Exchange + Mandarin Dictionary + AI Assistant**

namun tetap terlihat sebagai satu produk yang konsisten, bukan kumpulan
fitur yang terpisah.

------------------------------------------------------------------------

## 3. Design Direction

### Visual Style

**Clean + Modern + Minimalist**

### Dominant Color

  Warna         Hex         Penggunaan
  ------------- ----------- ---------------------------
  Primary Red   `#D71920`   CTA, button, active state
  Dark Red      `#B51218`   Hover / emphasis
  Light Red     `#FDEBEC`   Background section
  White         `#FFFFFF`   Card/background
  Black         `#171717`   Heading
  Gray          `#6B7280`   Secondary text
  Light Gray    `#F5F5F5`   Background

### Visual Characteristics

-   Banyak whitespace.
-   Border radius 12--16px.
-   Soft shadow.
-   Typography modern.
-   Icon sederhana.
-   Card minimal.
-   Tidak menggunakan gradient berlebihan.
-   CTA menggunakan warna merah.
-   Foto produk dengan background putih.
-   Layout desktop menggunakan grid.

------------------------------------------------------------------------

## 4. Typography

Rekomendasi:

**Primary Font** - Inter

**Chinese Font** - Noto Sans SC

Contoh:

``` text
Belanja kebutuhan China
购物中国商品
```

Heading:

``` text
Temukan kebutuhanmu
sebelum berangkat ke China
```

------------------------------------------------------------------------

## 5. Information Architecture

``` text
HOME
│
├── Shop
│   ├── Product Listing
│   ├── Product Detail
│   ├── Search
│   ├── Category
│   └── Cart
│
├── Exchange
│   ├── IDR → CNY
│   ├── CNY → IDR
│   ├── Exchange History
│   └── Exchange Detail
│
├── Mandarin
│   ├── Dictionary
│   ├── Categories
│   ├── Word Detail
│   └── Saved Words
│
├── Chatbot
│
├── Orders
│   ├── Order List
│   └── Order Detail
│
└── Account
    ├── Profile
    ├── Address
    ├── Payment
    └── Settings
```

------------------------------------------------------------------------

## 6. Navigation

Desktop menggunakan navbar horizontal.

``` text
┌──────────────────────────────────────────────────────────────┐
│ 🔴 LOGO    Shop   Exchange   Mandarin   Orders    🔍  🛒  👤 │
└──────────────────────────────────────────────────────────────┘
```

### Navigation

-   Logo
-   Shop
-   Exchange
-   Mandarin
-   Orders
-   Search
-   Cart
-   Account
-   Chatbot floating button

------------------------------------------------------------------------

## 7. Homepage

### Hero Section

Hero harus langsung menjelaskan value proposition.

``` text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  BELANJA • EXCHANGE • MANDARIN                               │
│                                                              │
│  Semua kebutuhanmu                                            │
│  untuk China, dalam satu tempat.                              │
│                                                              │
│  Belanja produk, tukarkan Rupiah ke Yuan,                     │
│  dan pelajari Bahasa Mandarin.                                │
│                                                              │
│  [ Mulai Belanja ]   [ Tukar Rupiah ]                         │
│                                                              │
│                              🛍️ 🇨🇳                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

## 8. Currency Widget

Widget exchange rate ditampilkan di homepage.

``` text
┌─────────────────────────────────┐
│        CURRENCY EXCHANGE        │
│                                 │
│  🇮🇩 IDR                        │
│  Rp 1.000.000                   │
│             ↓                   │
│  🇨🇳 CNY                        │
│  ¥ 430                          │
│                                 │
│  1 CNY ≈ Rp 2.325               │
│                                 │
│      [ Tukarkan Sekarang ]      │
└─────────────────────────────────┘
```

> Nilai tukar sebaiknya berasal dari API exchange-rate yang
> dikonfigurasi admin, bukan hard-code.

------------------------------------------------------------------------

## 9. Shop

### Product Listing

Desktop layout:

``` text
┌─────────────┬───────────────────────────────────────────────┐
│ FILTER      │ Products                                      │
│             │                                               │
│ Category    │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ □ Travel    │ │ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │          │
│ □ Fashion   │ │      │ │      │ │      │ │      │          │
│ □ Gadget    │ └──────┘ └──────┘ └──────┘ └──────┘          │
│ □ Souvenir  │   Product   Product   Product   Product       │
│             │   Rp xxx    Rp xxx    Rp xxx    Rp xxx        │
│ Price       │   ¥ xxx     ¥ xxx     ¥ xxx     ¥ xxx         │
└─────────────┴───────────────────────────────────────────────┘
```

### Product Card

Setiap product card memiliki:

-   Product image
-   Product name
-   Rating
-   Harga IDR
-   Harga CNY
-   Stock
-   Add to Cart
-   Favorite

Contoh:

``` text
┌──────────────────────┐
│                      │
│     PRODUCT IMAGE    │
│                      │
├──────────────────────┤
│ Travel Adapter       │
│ ★ 4.8                │
│                      │
│ Rp 125.000           │
│ ¥ 54                  │
│                      │
│ [ + Add to Cart ]    │
└──────────────────────┘
```

------------------------------------------------------------------------

## 10. Product Detail

Halaman detail:

``` text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  PRODUCT IMAGE       Travel Adapter                         │
│                                                             │
│                      ★ 4.8 (120 reviews)                    │
│                                                             │
│                      Rp 125.000                             │
│                      ¥ 54                                   │
│                                                             │
│                      Stock: 24                              │
│                                                             │
│                      Quantity [-] 1 [+]                     │
│                                                             │
│                      [ Add to Cart ]                        │
│                      [ Buy Now ]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

## 11. Shopping Cart

Cart menampilkan:

-   Produk
-   Quantity
-   Harga
-   Subtotal
-   Shipping
-   Total
-   IDR
-   CNY

``` text
Shopping Cart

Travel Adapter        1      Rp125.000
Travel Bag            2      Rp300.000

──────────────────────────────

Subtotal                       Rp425.000
Shipping                        Rp20.000

TOTAL                          Rp445.000
≈ ¥191

                    [ Checkout ]
```

------------------------------------------------------------------------

## 12. Checkout

Checkout harus **desktop-first**.

Layout:

``` text
┌──────────────────────────────────────────────────────────────┐
│ CHECKOUT                                                     │
├───────────────────────────────────┬──────────────────────────┤
│                                   │ ORDER SUMMARY            │
│ Shipping Address                  │                          │
│                                   │ Travel Adapter     125k  │
│ [ Address ]                       │ Travel Bag         300k  │
│                                   │                          │
│ Payment Method                    │ Subtotal           425k  │
│                                   │ Shipping            20k  │
│ ○ Bank Transfer                   │ ─────────────────────    │
│ ○ E-Wallet                        │ TOTAL              445k  │
│ ○ Card                            │                          │
│                                   │ ≈ ¥191                  │
│                                   │                          │
│ [ Place Order ]                   │                          │
└───────────────────────────────────┴──────────────────────────┘
```

### Checkout Steps

``` text
Cart
 ↓
Address
 ↓
Payment
 ↓
Review
 ↓
Success
```

------------------------------------------------------------------------

## 13. Order Success

``` text
✓

Order berhasil dibuat!

Order #INV-2026-000124

Total
Rp 445.000
≈ ¥191

[ Lihat Pesanan ]
[ Kembali Belanja ]
```

------------------------------------------------------------------------

## 14. Currency Exchange

Ini merupakan salah satu core feature.

### Exchange Page

``` text
┌──────────────────────────────────────────────────────────┐
│                  EXCHANGE CURRENCY                        │
│                                                          │
│       🇮🇩 Rupiah                       🇨🇳 Yuan            │
│                                                          │
│       Rp 1.000.000          →           ¥ 430            │
│                                                          │
│                   1 CNY = Rp 2.325                       │
│                                                          │
│                 [ Tukarkan ]                             │
└──────────────────────────────────────────────────────────┘
```

### Input

User dapat memasukkan:

``` text
IDR
Rp 5.000.000
```

Output:

``` text
CNY
¥ 2.150
```

Dan sebaliknya:

``` text
CNY
¥ 2.150
       ↓
IDR
Rp 5.000.000
```

------------------------------------------------------------------------

## 15. Exchange Flow

``` text
User
 ↓
Input IDR
 ↓
Get Exchange Rate
 ↓
Calculate CNY
 ↓
Review
 ↓
Confirm
 ↓
Payment
 ↓
Exchange Processing
 ↓
Success
```

### Exchange Status

``` text
Pending
Processing
Completed
Failed
Cancelled
```

------------------------------------------------------------------------

## 16. Exchange History

User dapat melihat:

  Date     From          Amount     To Status
  -------- ------ ------------- ------ -----------
  08 Oct   IDR      Rp1.000.000   ¥430 Completed
  05 Oct   IDR        Rp500.000   ¥215 Completed

------------------------------------------------------------------------

## 17. Mandarin Dictionary

Fitur kedua yang menjadi pembeda produk.

### Dictionary Homepage

``` text
┌──────────────────────────────────────────────────────┐
│                                                      │
│             Mandarin Dictionary                      │
│                                                      │
│   🔍 Cari kata Mandarin / Indonesia                  │
│                                                      │
│   "Terima kasih"                                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Hasil:

``` text
谢谢

Xièxiè

Terima kasih

Pinyin:
xiè xiè

Example:
谢谢你的帮助。

Terima kasih atas bantuanmu.
```

------------------------------------------------------------------------

## 18. Dictionary Categories

Kategori:

-   👋 Greetings
-   🍜 Food
-   🛍 Shopping
-   🚕 Transportation
-   🏨 Hotel
-   ✈️ Airport
-   💬 Conversation
-   💰 Money
-   🏥 Emergency
-   💼 Business

------------------------------------------------------------------------

## 19. Word Detail

``` text
谢谢

Xièxiè

/xiè xiè/

Terima kasih

━━━━━━━━━━━━━━━━

Example

谢谢你的帮助。

Xièxiè nǐ de bāngzhù.

Terima kasih atas bantuanmu.

━━━━━━━━━━━━━━━━

[ 🔊 Listen ]

[ ☆ Save Word ]
```

Jika memungkinkan, tambahkan **Text-to-Speech Mandarin**.

------------------------------------------------------------------------

## 20. Saved Words

User dapat menyimpan vocabulary.

``` text
My Vocabulary

☆ 谢谢
   Xièxiè
   Terima kasih

☆ 你好
   Nǐ hǎo
   Halo

☆ 多少钱
   Duōshao qián
   Berapa harganya?
```

------------------------------------------------------------------------

## 21. Chatbot

Chatbot menjadi assistant utama platform.

### Floating Button

Desktop:

``` text
                                     ┌───────────┐
                                     │     AI    │
                                     │     ✦     │
                                     └───────────┘
```

Saat diklik:

``` text
┌───────────────────────────────┐
│ 🔴 Mandarin Assistant      × │
├───────────────────────────────┤
│                               │
│ Halo! 👋                      │
│ Ada yang bisa saya bantu?     │
│                               │
│ [Cari produk]                 │
│ [Cek kurs Yuan]               │
│ [Belajar Mandarin]            │
│                               │
│ User:                         │
│ Berapa ¥100 ke Rupiah?        │
│                               │
│ AI:                           │
│ ¥100 sekitar Rp232.500.       │
│                               │
├───────────────────────────────┤
│ Tulis pesan...        [➤]     │
└───────────────────────────────┘
```

------------------------------------------------------------------------

## 22. Kemampuan Chatbot

### Shopping

``` text
"Cari adapter untuk China"
```

Chatbot memberikan rekomendasi produk.

### Currency

``` text
"Berapa 2 juta rupiah ke Yuan?"
```

### Mandarin

``` text
"Bagaimana mengatakan 'berapa harganya' dalam Mandarin?"
```

Jawaban:

``` text
多少钱？

Duōshao qián?

Artinya:
Berapa harganya?
```

### Order

``` text
"Status pesanan saya?"
```

Chatbot mengambil data order user.

------------------------------------------------------------------------

## 23. AI Context

Chatbot sebaiknya memiliki akses terbatas ke:

``` text
Product Database
       │
       ├── Product
       ├── Price
       └── Stock

Exchange API
       │
       └── Current Rate

Dictionary Database
       │
       └── Vocabulary

Order Database
       │
       └── User Orders
```

Dengan begitu chatbot tidak hanya menjadi chatbot generik.

------------------------------------------------------------------------

## 24. User Authentication

Gunakan authentication untuk:

-   Login
-   Register
-   Logout
-   Forgot password
-   Profile
-   Order history
-   Saved vocabulary
-   Exchange history
-   Cart persistence

------------------------------------------------------------------------

## 25. User Dashboard

Dashboard:

``` text
Welcome back 👋

┌────────────┬────────────┬────────────┐
│ Orders     │ Exchange   │ Vocabulary │
│ 12         │ ¥2,430     │ 84 words   │
└────────────┴────────────┴────────────┘

Recent Orders

#INV00123    Completed
#INV00121    Processing
#INV00118    Completed
```

------------------------------------------------------------------------

## 26. Admin Dashboard

Admin memiliki:

### Product Management

-   Add product
-   Edit product
-   Delete product
-   Stock
-   Price
-   Category
-   Image

### Order Management

``` text
Order
Customer
Total
Payment
Status
Created
```

### Exchange Management

-   Exchange rate
-   Fee
-   Transaction
-   Transaction status

### Dictionary Management

-   Add vocabulary
-   Edit vocabulary
-   Delete vocabulary
-   Example sentences

### User Management

-   Users
-   Orders
-   Account status

------------------------------------------------------------------------

## 27. Recommended Tech Stack

### Frontend

``` text
Next.js
TypeScript
Tailwind CSS
```

Tambahkan:

``` text
shadcn/ui
Lucide Icons
React Hook Form
Zod
TanStack Query
```

------------------------------------------------------------------------

## 28. Backend Architecture

Next.js dapat digunakan sebagai full-stack framework.

``` text
Next.js
│
├── App Router
│
├── Server Components
│
├── Server Actions
│
├── API Routes
│
└── Middleware
```

------------------------------------------------------------------------

## 29. Database

Rekomendasi:

**PostgreSQL**

dengan ORM:

**Prisma**

Struktur:

``` text
User
Product
Category
Cart
CartItem
Order
OrderItem
Payment
ExchangeTransaction
ExchangeRate
DictionaryWord
SavedWord
ChatSession
ChatMessage
Address
```

------------------------------------------------------------------------

## 30. Database Relationship

``` text
User
 │
 ├──── Orders
 │       │
 │       └── OrderItems
 │
 ├──── Cart
 │       └── CartItems
 │
 ├──── ExchangeTransactions
 │
 ├──── SavedWords
 │
 └──── ChatSessions
          │
          └── ChatMessages


Product
 │
 ├── Category
 └── OrderItems
```

------------------------------------------------------------------------

## 31. Suggested Folder Structure

``` text
src/
│
├── app/
│   ├── page.tsx
│   │
│   ├── shop/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── checkout/
│   │   └── page.tsx
│   │
│   ├── exchange/
│   │   └── page.tsx
│   │
│   ├── mandarin/
│   │   ├── page.tsx
│   │   └── [word]/
│   │       └── page.tsx
│   │
│   ├── orders/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── product/
│   ├── checkout/
│   ├── exchange/
│   ├── dictionary/
│   └── chatbot/
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── currency.ts
│   └── utils.ts
│
├── services/
│   ├── product.service.ts
│   ├── order.service.ts
│   ├── exchange.service.ts
│   ├── dictionary.service.ts
│   └── chatbot.service.ts
│
└── types/
```

------------------------------------------------------------------------

## 32. API Structure

``` text
GET    /api/products
GET    /api/products/:id
POST   /api/products

GET    /api/categories

GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:id
DELETE /api/cart/:id

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

GET    /api/exchange/rate
POST   /api/exchange

GET    /api/dictionary
GET    /api/dictionary/:word
POST   /api/dictionary/save

POST   /api/chat
GET    /api/chat/history
```

------------------------------------------------------------------------

## 33. Security Requirements

Karena terdapat fitur transaksi uang, security harus menjadi requirement
utama.

### Wajib

-   HTTPS
-   Authentication
-   Authorization
-   Input validation
-   Rate limiting
-   CSRF protection
-   Secure cookies
-   Password hashing
-   Server-side validation
-   Environment variables
-   API key protection
-   Audit logs

Jangan pernah menaruh:

``` text
API_KEY
DATABASE_URL
PAYMENT_SECRET
```

di frontend.

Gunakan:

``` text
.env
```

dan hanya akses dari server.

------------------------------------------------------------------------

## 34. Payment

Untuk MVP, payment dapat dibuat menggunakan payment gateway Indonesia.

Flow:

``` text
Checkout
 ↓
Create Order
 ↓
Create Payment
 ↓
Payment Gateway
 ↓
Payment Success
 ↓
Webhook
 ↓
Update Order
 ↓
Completed
```

Payment status:

``` text
Pending
Paid
Failed
Expired
Refunded
```

------------------------------------------------------------------------

## 35. Exchange Fee

Produk exchange dapat memiliki biaya layanan.

Contoh:

``` text
Amount

Rp 1.000.000

Exchange Rate

1 CNY = Rp 2.325

Exchange Fee

Rp 10.000

You receive

¥ 425
```

Perhitungan harus dilakukan **server-side** agar tidak dapat
dimanipulasi dari browser.

------------------------------------------------------------------------

## 36. Responsive Design

Walaupun fokus utama adalah **desktop**, website tetap responsive.

### Desktop

``` text
1440px
1280px
1024px
```

### Tablet

``` text
768px
```

### Mobile

``` text
390px
375px
```

Desktop menjadi prioritas:

``` text
Desktop > Tablet > Mobile
```

------------------------------------------------------------------------

## 37. Main User Journey

### Shopping

``` text
Home
 ↓
Shop
 ↓
Product
 ↓
Add Cart
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Success
```

### Exchange

``` text
Home
 ↓
Exchange
 ↓
Input IDR
 ↓
Calculate
 ↓
Review
 ↓
Payment
 ↓
Exchange Processing
 ↓
Completed
```

### Mandarin

``` text
Home
 ↓
Mandarin
 ↓
Search
 ↓
Word
 ↓
Listen
 ↓
Save
```

### Chatbot

``` text
Any Page
 ↓
Chatbot
 ↓
Ask Question
 ↓
AI
 ↓
Answer
 ↓
Action
```

------------------------------------------------------------------------

## 38. MVP Scope

Untuk versi pertama, jangan langsung membuat semua fitur secara penuh.

### Phase 1 --- Core

-   [ ] Homepage
-   [ ] Navbar
-   [ ] Product listing
-   [ ] Product detail
-   [ ] Cart
-   [ ] Checkout
-   [ ] Login/register
-   [ ] Order history

### Phase 2 --- Exchange

-   [ ] IDR → CNY
-   [ ] CNY → IDR
-   [ ] Exchange rate
-   [ ] Exchange history
-   [ ] Exchange transaction

### Phase 3 --- Mandarin

-   [ ] Dictionary
-   [ ] Search
-   [ ] Pinyin
-   [ ] Translation
-   [ ] Example sentence
-   [ ] Saved words
-   [ ] Text-to-speech

### Phase 4 --- AI

-   [ ] Chat UI
-   [ ] AI response
-   [ ] Product recommendation
-   [ ] Currency calculation
-   [ ] Mandarin assistant
-   [ ] Order assistant

### Phase 5 --- Admin

-   [ ] Product management
-   [ ] Order management
-   [ ] Exchange management
-   [ ] Dictionary management
-   [ ] User management
-   [ ] Dashboard analytics

------------------------------------------------------------------------

## 39. MVP Success Metrics

### E-commerce

-   Product view → Add to cart
-   Add to cart → Checkout
-   Checkout → Payment success

### Exchange

-   Exchange calculator usage
-   Successful exchange
-   Average exchange amount

### Mandarin

-   Dictionary searches
-   Saved vocabulary
-   Audio plays

### AI

-   Number of conversations
-   Chatbot resolution rate
-   Product recommendation clicks

------------------------------------------------------------------------

## 40. Acceptance Criteria

### Shop

-   User dapat melihat produk.
-   User dapat mencari produk.
-   User dapat memasukkan produk ke cart.
-   User dapat mengubah quantity.
-   User dapat checkout.
-   User dapat membuat order.

### Currency

-   User dapat memasukkan IDR.
-   Sistem menghitung CNY.
-   User dapat melihat exchange rate.
-   User dapat melihat fee.
-   Transaksi tersimpan.

### Dictionary

-   User dapat mencari kata.
-   Sistem menampilkan Hanzi.
-   Sistem menampilkan Pinyin.
-   Sistem menampilkan arti Bahasa Indonesia.
-   Sistem menampilkan contoh kalimat.
-   User dapat menyimpan vocabulary.

### Chatbot

-   User dapat membuka chatbot dari seluruh halaman.
-   User dapat bertanya menggunakan bahasa natural.
-   Chatbot dapat menjawab pertanyaan produk.
-   Chatbot dapat membantu konversi mata uang.
-   Chatbot dapat membantu Mandarin.
-   Chatbot dapat membantu status order.

------------------------------------------------------------------------

## 41. Design System

Komponen utama:

``` text
Button
Input
Select
Dropdown
Modal
Drawer
Card
Badge
Tabs
Toast
Tooltip
Table
Pagination
Breadcrumb
Navbar
Sidebar
ProductCard
PriceDisplay
CurrencyInput
ChatWindow
DictionaryCard
OrderCard
```

### Button Hierarchy

``` text
Primary
[ Tukarkan Sekarang ]

Secondary
[ Lihat Produk ]

Ghost
[ Selengkapnya ]

Danger
[ Batalkan ]
```

Primary button:

``` text
background: #D71920
color: white
border-radius: 12px
```

------------------------------------------------------------------------

## 42. Overall UI Concept

``` text
╭────────────────────────────────────────────────────────────╮
│ 🔴 LOGO     Shop   Exchange   Mandarin   Orders    🛒 👤 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│       BELANJA • EXCHANGE • MANDARIN                        │
│                                                            │
│       Semua kebutuhanmu                                    │
│       untuk China, dalam satu tempat.                      │
│                                                            │
│       [ Mulai Belanja ]  [ Tukar Rupiah ]                  │
│                                                            │
│                         🇮🇩  →  🇨🇳                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    Popular Products                         │
│                                                            │
│    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│    │ PRODUCT│ │ PRODUCT│ │ PRODUCT│ │ PRODUCT│            │
│    └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    Learn Mandarin                          │
│                                                            │
│       你好        谢谢        多少钱        再见              │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                  Need Help?                                │
│                  [ Chat with AI ]                          │
│                                                            │
╰────────────────────────────────────────────────────────────╯
                                             🔴 AI
```

------------------------------------------------------------------------

## 43. Recommended Final Tech Architecture

``` text
                    ┌─────────────────┐
                    │    Next.js      │
                    │    App Router   │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
        E-Commerce       Exchange          Mandarin
             │               │                │
             ▼               ▼                ▼
         Products       Exchange API      Dictionary
             │               │                │
             └───────────────┼────────────────┘
                             │
                             ▼
                       PostgreSQL
                         + Prisma
                             │
             ┌───────────────┼────────────────┐
             ▼               ▼                ▼
          Payment          AI API          Storage
          Gateway                         Images
```

### Stack Final

``` text
Next.js 16+
TypeScript
Tailwind CSS
shadcn/ui
Lucide React
Prisma
PostgreSQL
Auth.js
TanStack Query
Zod
React Hook Form
Payment Gateway
Exchange Rate API
AI API
Object Storage
```

------------------------------------------------------------------------

## 44. Prioritas Development

  Fitur               Priority
  ------------------- -------------
  Homepage            🔴 Critical
  Product             🔴 Critical
  Cart                🔴 Critical
  Checkout            🔴 Critical
  Authentication      🔴 Critical
  Order               🔴 Critical
  Currency Exchange   🔴 Critical
  Dictionary          🟠 High
  Chatbot             🟠 High
  Saved Vocabulary    🟡 Medium
  Admin               🟠 High
  Analytics           🟢 Later

------------------------------------------------------------------------

## 45. Catatan Legal & Compliance

Karena fitur penukaran uang melibatkan uang nyata, implementasi produksi
perlu memperhatikan regulasi, KYC/AML, perizinan, payment provider, dan
status apakah platform hanya menampilkan kurs/simulasi atau benar-benar
memfasilitasi transaksi valuta asing.

Untuk MVP, lebih aman memisahkan **currency calculator** dari layanan
penukaran uang riil sampai aspek legal dan payment flow ditentukan.

------------------------------------------------------------------------

## 46. Recommended Development Roadmap

Urutan pengembangan:

1.  **Design System & UI/UX**
2.  **Next.js + Tailwind CSS setup**
3.  **Authentication**
4.  **Database + Prisma**
5.  **Product catalog**
6.  **Cart**
7.  **Checkout**
8.  **Order management**
9.  **Currency calculator**
10. **Exchange transaction**
11. **Mandarin dictionary**
12. **Saved vocabulary**
13. **Chatbot**
14. **Admin dashboard**
15. **Payment integration**
16. **Testing & security**
17. **Deployment**

Target MVP sebaiknya memprioritaskan **Shop + Cart + Checkout + Currency
Calculator + Dictionary**, kemudian chatbot dan transaksi exchange riil
ditambahkan setelah fondasi sistem stabil.
