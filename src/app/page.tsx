'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PDFProcessor from '@/components/PDFProcessor';
import FeatureCard from '@/components/FeatureCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  {
    id: 'merge',
    title: 'PDF Birleştirme',
    description: 'Birden fazla PDF dosyasını tek bir dosyada birleştirin',
  },
  {
    id: 'split',
    title: 'PDF Ayırma',
    description: 'PDF dosyasını sayfalara göre ayırın veya belirli sayfaları çıkarın',
  },
  {
    id: 'compress',
    title: 'PDF Sıkıştırma',
    description: 'PDF dosya boyutunu küçültün, kaliteyi koruyun',
  },

  {
    id: 'word-to-pdf',
    title: "Word'den PDF'ye",
    description: 'Word belgelerini profesyonel PDF formatına dönüştürün',
  },
  {
    id: 'image-to-pdf',
    title: "Resimden PDF'ye",
    description: 'JPG, PNG resimlerini PDF dosyasına dönüştürün',
  },
  {
    id: 'delete-pages',
    title: 'Sayfa Silme',
    description: "PDF'den belirli sayfaları silin veya yeniden sıralayın",
  },
  {
    id: 'fill-form',
    title: 'PDF Form Doldurma',
    description: 'PDF formlarını dijital olarak doldurun',
  },
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    setUploadedFiles([]);
  };

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleBackToFeatures = () => {
    setSelectedFeature(null);
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!selectedFeature ? (
          <>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                PDF İşlemleri
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                PDF dosyalarınızı ücretsiz olarak birleştirin, ayırın, sıkıştırın, dönüştürün ve daha fazlasını yapın. 
                Profesyonel PDF araçları ile işlerinizi kolaylaştırın.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-center mb-2 text-2xl">
                    🛡️
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">%100 Güvenli</h3>
                  <p className="text-gray-600">Dosyalarınız sunucularımızda saklanmaz</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-center mb-2 text-2xl">
                    ⚡
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hızlı İşlem</h3>
                  <p className="text-gray-600">Saniyeler içinde işlem tamamlanır</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-center mb-2 text-2xl">
                    ✅
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Ücretsiz</h3>
                  <p className="text-gray-600">Tüm özellikler tamamen ücretsiz</p>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureCard
                    feature={feature}
                    onClick={() => handleFeatureSelect(feature.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* How it works */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Nasıl Çalışır?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    ⬆️
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Dosya Yükleyin</h3>
                  <p className="text-gray-600">PDF dosyanızı güvenli bir şekilde yükleyin</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    📄
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. İşlemi Seçin</h3>
                  <p className="text-gray-600">İstediğiniz PDF işlemini seçin</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    ⬇️
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. İndirin</h3>
                  <p className="text-gray-600">İşlenmiş dosyanızı hemen indirin</p>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleBackToFeatures}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              ← Tüm Özelliklere Dön
            </motion.button>
            
            <PDFProcessor
              feature={features.find(f => f.id === selectedFeature)!}
              uploadedFiles={uploadedFiles}
              onFilesUpload={handleFilesUpload}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
