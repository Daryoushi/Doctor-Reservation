 سیستم نوبت‌دهی آنلاین پزشکی

## درباره پروژه
یک پلتفرم نوبت‌دهی آنلاین برای پزشکان است. کاربران می‌توانند پزشک مورد نظر خود را جستجو کرده، نوبت رزرو کنند، پرداخت انجام دهند و نظر ثبت کنند. پنل مدیریت پزشکان نیز برای مدیریت نوبت‌ها و زمان‌بندی وجود دارد.

---

## تکنولوژی‌ها

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vazirmatn** (فونت فارسی)

### Backend
- **Next.js API Routes**
- **MongoDB** + **Mongoose**
- **JWT** (احراز هویت)
- **SMS.ir** (ارسال SMS)

---

## قابلیت‌ها

### احراز هویت
- ثبت‌نام و ورود با شماره موبایل (OTP)
- ورود با رمز عبور
- احراز هویت JWT (Access + Refresh Token)
- محافظت از مسیرهای خصوصی با middleware
- خروج از حساب

### مدیریت پزشکان
- لیست پزشکان با جستجو و فیلتر
- صفحه جزئیات پزشک
- نمایش پزشکان محبوب و جدید
- پنل مدیریت پزشکان (ثبت‌نام، ورود، پروفایل)

### نوبت‌دهی
- مشاهده زمان‌های خالی پزشک
- رزرو نوبت
- پرداخت آنلاین (شبیه‌سازی‌شده)
- مشاهده نوبت‌های من
- لغو نوبت

### نظرات
- ثبت نظر و امتیاز (۱ تا ۵ ستاره)
- نمایش نظرات در صفحه اصلی و صفحه پزشک

---

## نصب و اجرا

### پیش‌نیازها
- Node.js 18+
- MongoDB 6+
- npm یا yarn

### مراحل نصب

```bash
# ۱. مخزن را clone کنید
git clone https://github.com/USERNAME/starcoach.git
cd starcoach

# ۲. وابستگی‌ها را نصب کنید
npm install

# ۳. فایل env ایجاد کنید
cp .env.example .env.local
# سپس مقادیر را در .env.local تنظیم کنید

# ۴. دیتابیس را مقداردهی کنید
npm run seed

# ۵. پروژه را اجرا کنید
npm run dev
```

### متغیرهای محیطی (`.env.local`)

```
MONGODB_URI=mongodb://localhost:27017/starcoach
JWT_SECRET=your-secret-key
KAVENEGAR_API_KEY=your-api-key
SMS_API_KEY=your-smsir-key
```

---

## ساختار پروژه

```
src/
├── app/
│   ├── (main)/          # صفحه اصلی
│   ├── api/             # API Routes
│   ├── auth/            # ورود / ثبت‌نام
│   ├── components/      # کامپوننت‌های مشترک
│   ├── doctors/         # صفحات پزشکان
│   ├── appointments/    # نوبت‌ها
│   ├── profile/         # پروفایل کاربر
│   ├── payment/         # پرداخت
│   └── ...
├── lib/                 # توابع کمکی
├── models/              # مدل‌های Mongoose
├── types/               # تایپ‌های TypeScript
└── constants/           # ثابت‌ها
```







This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
