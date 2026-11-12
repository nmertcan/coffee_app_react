# Kahve Durağı | React Coffee Ordering App

[English](#english) · [Canlı demo](https://coffee-app-react.vercel.app/)

## Türkçe

**Kahve Durağı**, kahve ürünlerini keşfetme ve sipariş süreçlerini yönetme senaryosunu gösteren React uygulamasıdır. **API entegrasyonu, bileşenler arası veri akışı, sepet durumu ve çok adımlı kullanıcı deneyimi** odaklı bir portfolyo projesidir.

### Özellikler
- Kahve listeleme (`GET /api/coffee`), arama ve kategori filtreleme
- Ürün detay ekranı
- Sepete ekleme, adet güncelleme ve sepetten çıkarma
- Sipariş oluşturma (`POST /orders`), siparişleri listeleme ve hazır durumuna geçirme (`PUT /orders/{id}/ready`)
- `useState` ve props üzerinden durum/veri paylaşımı
- API kullanılamadığında örnek kahve verileriyle demo deneyimi

**Teknolojiler:** React 19 · JavaScript · Vite · Axios · React Router · Lucide React · CSS · ESLint

### Kurulum
```bash
npm install
npm run dev
```

### Kontroller
```bash
npm run lint
npm test
npm run build
```

**Canlı demo:** https://coffee-app-react.vercel.app/

> API bağlantısı ve sipariş işlemleri kullanılan servis ortamına bağlıdır. Demo verilerinin görünmesi, gerçek siparişin sunucuya kaydedildiği anlamına gelmez.

## English

A React coffee-ordering interface demonstrating **API integration, product discovery, cart state, and order-management flows**. Features product filtering, detail views, cart quantity controls, order creation/listing, ready-state updates, and demo-data fallback when the API is unavailable.

**Stack:** React 19, JavaScript, Vite, Axios, React Router, Lucide React, CSS, ESLint.

**Run:** `npm install && npm run dev` · **Checks:** `npm run lint && npm test && npm run build`

**Live demo:** https://coffee-app-react.vercel.app/
