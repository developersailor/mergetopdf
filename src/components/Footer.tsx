'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <span className="text-white text-lg">📄</span>
              </div>
              <span className="text-xl font-bold">PDF İşlemleri</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              PDF dosyalarınızı ücretsiz olarak işleyin. Birleştirme, ayırma, sıkıştırma, 
              dönüştürme ve daha fazlası için güvenilir platform.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🛡️</span>
                <span className="text-sm text-gray-300">%100 Güvenli</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-sm text-gray-300">Hızlı İşlem</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">✅</span>
                <span className="text-sm text-gray-300">Ücretsiz</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <a href="#merge" className="text-gray-300 hover:text-white transition-colors">
                  PDF Birleştirme
                </a>
              </li>
              <li>
                <a href="#split" className="text-gray-300 hover:text-white transition-colors">
                  PDF Ayırma
                </a>
              </li>
              <li>
                <a href="#compress" className="text-gray-300 hover:text-white transition-colors">
                  PDF Sıkıştırma
                </a>
              </li>
              <li>
                <a href="#convert" className="text-gray-300 hover:text-white transition-colors">
                  PDF Dönüştürme
                </a>
              </li>
              <li>
                <a href="#ocr" className="text-gray-300 hover:text-white transition-colors">
                  OCR İşlemleri
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">✉️</span>
                <span className="text-gray-300">info@pdfislemleri.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">📞</span>
                <span className="text-gray-300">+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">📍</span>
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PDF İşlemleri. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Gizlilik Politikası
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Kullanım Şartları
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Çerez Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 