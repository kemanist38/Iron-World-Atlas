# Iron World Atlas 🌍

**atWar tarzında bir strateji oyunu**

## Özellikler

✅ Kullanıcı Kaydı ve Giriş Sistemi  
✅ Oyun Oluşturma ve Katılma  
✅ Gerçek Zamanlı Harita Görüntüleme  
✅ Birim Yönetimi (Piyade, Tank, Uçak, Gemi)  
✅ Şehir Kontrol Sistemi  
✅ Tur Tabanlı Oyun Mekanikası  
✅ Socket.IO ile Gerçek Zamanlı İletişim  

## Kurulum

### Gereksinimler
- Node.js 14+
- MongoDB
- npm veya yarn

### Adım 1: Repository'i klonlayın
```bash
git clone https://github.com/kemanist38/Iron-World-Atlas.git
cd Iron-World-Atlas
```

### Adım 2: Bağımlılıkları yükleyin
```bash
npm install
```

### Adım 3: Ortam Değişkenlerini Ayarlayın
```.env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/iron-world-atlas
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Adım 4: MongoDB'yi Başlatın
```bash
mongod
```

### Adım 5: Sunucuyu Başlatın
```bash
npm start
```

Oyun: http://localhost:3000

## Oyun Mekanikası

### Ülkeler
- 🇹🇷 Türkiye
- 🇩🇪 Almanya
- 🇫🇷 Fransa
- 🇬🇧 İngiltere
- 🇺🇸 ABD
- 🇷🇺 Rusya
- 🇨🇳 Çin
- 🇯🇵 Japonya

## Proje Yapısı

```
Iron-World-Atlas/
├── server.js
├── package.json
├── models/
│   ├── User.js
│   └── Game.js
├── routes/
│   ├── auth.js
│   └── game.js
└── public/
    ├── index.html
    ├── styles.css
    └── js/
        ├── config.js
        ├── auth.js
        ├── game.js
        └── ui.js
```

## API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş

### Oyun
- `POST /api/game/create` - Oyun oluştur
- `GET /api/game/list` - Oyunları listele
- `POST /api/game/:gameId/join` - Oyuna katıl

## Teknoloji

- Backend: Node.js, Express, MongoDB
- Frontend: HTML5, CSS3, Canvas, JavaScript
- Gerçek Zamanlı: Socket.IO
- Güvenlik: JWT, bcrypt

---

**İyi oyunlar!** 🎮⚔️