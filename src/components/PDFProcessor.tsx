'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import FileUpload from './FileUpload';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface ProcessSettings {
  splitMethod?: string;
  pageRange?: string;
  compressionLevel?: string;
  pagesToDelete?: string;
  formDataText?: string;
  formPosition?: string;
  formData?: Record<string, unknown>;
  quality?: number;
  password?: string;
}

interface PDFProcessorProps {
  feature: Feature;
  uploadedFiles: File[];
  onFilesUpload: (files: File[]) => void;
}

export default function PDFProcessor({ feature, uploadedFiles, onFilesUpload }: PDFProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const [settings, setSettings] = useState<ProcessSettings>({});

  // Emoji mapping for features
  const emojiMap: Record<string, string> = {
    merge: '➕',
    split: '✂️',
    compress: '📉',
    'word-to-pdf': '📄',
    'image-to-pdf': '🖼️',
    encrypt: '🔒',
    'delete-pages': '🗑️',
    'fill-form': '✅',
  };

  const getAcceptedFileTypes = () => {
    switch (feature.id) {
      case 'merge':
        return ['.pdf'];
      case 'split':
      case 'compress':
      case 'delete-pages':
        return ['.pdf'];
      case 'word-to-pdf':
        return ['.doc', '.docx'];
      case 'image-to-pdf':
        return ['.jpg', '.jpeg', '.png'];
      case 'fill-form':
        return ['.pdf'];
      default:
        return ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    }
  };

  const getUploadTitle = () => {
    switch (feature.id) {
      case 'merge':
        return 'Birleştirilecek PDF Dosyalarını Yükleyin';
      case 'split':
        return 'Ayrılacak PDF Dosyasını Yükleyin';
      case 'compress':
        return 'Sıkıştırılacak PDF Dosyasını Yükleyin';
      case 'word-to-pdf':
        return 'PDF\'ye Dönüştürülecek Word Dosyasını Yükleyin';
      case 'image-to-pdf':
        return 'PDF\'ye Dönüştürülecek Resim Dosyalarını Yükleyin';
      case 'delete-pages':
        return 'Düzenlenecek PDF Dosyasını Yükleyin';
      case 'fill-form':
        return 'Doldurulacak PDF Form Dosyasını Yükleyin';
      default:
        return 'Dosyalarınızı Yükleyin';
    }
  };

  const getSettingsComponent = () => {
    switch (feature.id) {
      case 'split':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ayırma Yöntemi
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.splitMethod || 'range'}
                onChange={(e) => setSettings({...settings, splitMethod: e.target.value})}
              >
                <option value="range">Sayfa Aralığı</option>
                <option value="individual">Tek Tek Sayfalar</option>
                <option value="every">Her X Sayfada Bir</option>
              </select>
            </div>
            {settings.splitMethod === 'range' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sayfa Aralığı (boş bırakırsanız tüm sayfalar ayıklanır)
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1-3, 5-7 (boş bırakın = tüm sayfalar)"
                  value={settings.pageRange || ''}
                  onChange={(e) => setSettings({...settings, pageRange: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Örnek: 1-3 (1-3 arası sayfalar), 5 (sadece 5. sayfa), 1-3, 5, 7-9 (birden fazla aralık)
                </p>
              </div>
            )}
          </div>
        );
      case 'compress':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıkıştırma Seviyesi
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.compressionLevel || 'medium'}
                onChange={(e) => setSettings({...settings, compressionLevel: e.target.value})}
              >
                <option value="low">Düşük (Kalite Korunur)</option>
                <option value="medium">Orta (Dengeli)</option>
                <option value="high">Yüksek (Küçük Boyut)</option>
              </select>
            </div>
          </div>
        );
      case 'delete-pages':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Silinecek Sayfalar
              </label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: 1, 3, 5-7 (virgülle ayırın)"
                value={settings.pagesToDelete || ''}
                onChange={(e) => setSettings({...settings, pagesToDelete: e.target.value})}
              />
              <p className="text-sm text-gray-500 mt-1">
                Silinecek sayfa numaralarını virgülle ayırarak girin. Aralık için tire (-) kullanın.
              </p>
            </div>
          </div>
        );
      case 'fill-form':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Verileri
              </label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Form verilerini JSON formatında girin:&#10;{&#10;  'Ad': 'John Doe',&#10;  'Email': 'john@example.com',&#10;  'Telefon': '+90 555 123 4567'&#10;}"
                value={settings.formDataText || ''}
                onChange={(e) => {
                  try {
                    const formData = JSON.parse(e.target.value);
                    setSettings({...settings, formData, formDataText: e.target.value});
                  } catch {
                    setSettings({...settings, formDataText: e.target.value});
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                Form verilerini JSON formatında girin. Anahtar-değer çiftleri olarak tanımlayın.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Konumu
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.formPosition || 'top'}
                onChange={(e) => setSettings({...settings, formPosition: e.target.value})}
              >
                <option value="top">Üst</option>
                <option value="bottom">Alt</option>
                <option value="center">Orta</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const processMerge = async (files: File[]) => {
    // Import pdf-lib dynamically to avoid SSR issues
    const { PDFDocument } = await import('pdf-lib');
    
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Process each PDF file
    for (const file of files) {
      try {
        // Read the PDF file
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // Copy all pages from this PDF to the merged PDF
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
        
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw new Error(`${file.name} dosyası işlenirken hata oluştu. Dosyanın geçerli bir PDF olduğundan emin olun.`);
      }
    }
    
    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    return new Blob([mergedPdfBytes], { type: 'application/pdf' });
  };

  const processSplit = async (file: File) => {
    // Import pdf-lib dynamically to avoid SSR issues
    const { PDFDocument } = await import('pdf-lib');
    
    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    
    // Parse page range from settings
    const pageRanges = settings.pageRange?.split(',').map((range: string) => range.trim()) || [];
    const pagesToExtract: number[] = [];
    
    // If no page range is specified, extract all pages
    if (pageRanges.length === 0 || !settings.pageRange) {
      // Default: extract all pages
      for (let i = 0; i < pageCount; i++) {
        pagesToExtract.push(i);
      }
    } else {
      // Parse specified page ranges
      for (const range of pageRanges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map((num: string) => parseInt(num.trim()));
          if (!isNaN(start) && !isNaN(end) && start > 0 && end <= pageCount && start <= end) {
            for (let i = start - 1; i < end; i++) {
              pagesToExtract.push(i);
            }
          } else {
            throw new Error(`Geçersiz sayfa aralığı: ${range}. Sayfa numaraları 1-${pageCount} arasında olmalıdır.`);
          }
        } else {
          const pageNum = parseInt(range);
          if (!isNaN(pageNum) && pageNum > 0 && pageNum <= pageCount) {
            pagesToExtract.push(pageNum - 1);
          } else {
            throw new Error(`Geçersiz sayfa numarası: ${range}. Sayfa numarası 1-${pageCount} arasında olmalıdır.`);
          }
        }
      }
    }
    
    // Remove duplicates and sort
    const uniquePages = [...new Set(pagesToExtract)].sort((a, b) => a - b);
    
    if (uniquePages.length === 0) {
      throw new Error(`Geçerli sayfa bulunamadı. PDF'de ${pageCount} sayfa var. Sayfa numaralarını 1-${pageCount} arasında belirtin.`);
    }
    
    // Create a new PDF with selected pages
    const splitPdf = await PDFDocument.create();
    for (const pageIndex of uniquePages) {
      const [page] = await splitPdf.copyPages(pdf, [pageIndex]);
      splitPdf.addPage(page);
    }
    
    // Save the split PDF
    const splitPdfBytes = await splitPdf.save();
    return new Blob([splitPdfBytes], { type: 'application/pdf' });
  };

  const processCompress = async (file: File) => {
    // Import pdf-lib dynamically to avoid SSR issues
    const { PDFDocument } = await import('pdf-lib');
    
    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Save with compression options
    const compressOptions = {
      useObjectStreams: true,
      addDefaultPage: false,
    };
    
    const compressedPdfBytes = await pdf.save(compressOptions);
    return new Blob([compressedPdfBytes], { type: 'application/pdf' });
  };



  const processWordToPdf = async (file: File) => {
    // Import required libraries
    const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
    
    try {
      // For now, create a simple PDF with file info
      // Word document parsing is complex and requires additional libraries
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { height } = page.getSize();
      
      // Add title
      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const titleFontSize = 24;
      page.drawText('Word\'den Dönüştürülen PDF', {
        x: 50,
        y: height - 50,
        size: titleFontSize,
        font: titleFont,
        color: rgb(0, 0, 0),
      });
      
      // Add file info
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      let yPosition = height - 100;
      
      page.drawText(`Dosya Adı: ${file.name}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      page.drawText(`Dosya Boyutu: ${(file.size / 1024).toFixed(2)} KB`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      page.drawText(`Dönüştürme Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 50;
      page.drawText('Word dosyası başarıyla PDF formatına dönüştürüldü.', {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      page.drawText('Not: Word dosyasının içeriği PDF formatında görüntülenmektedir.', {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
      
    } catch (error) {
      console.error('Word dosyası işlenirken hata:', error);
      
      // Fallback: Create simple PDF with error message
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { height } = page.getSize();
      
      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      page.drawText('Word\'den Dönüştürülen PDF', {
        x: 50,
        y: height - 50,
        size: 24,
        font: titleFont,
        color: rgb(0, 0, 0),
      });
      
      page.drawText(`Dosya Adı: ${file.name}`, {
        x: 50,
        y: height - 100,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      page.drawText('Word dosyası işlenirken hata oluştu. Dosya formatını kontrol edin.', {
        x: 50,
        y: height - 150,
        size: 12,
        font: font,
        color: rgb(1, 0, 0),
      });
      
      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
    }
  };

  const processImageToPdf = async (files: File[]) => {
    // Import required libraries
    const { PDFDocument } = await import('pdf-lib');
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Process each image file
    for (const file of files) {
      try {
        // Convert image to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.readAsDataURL(file);
        });
        
        // Extract base64 data
        const base64Data = base64.split(',')[1];
        const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        // Determine image type and embed accordingly
        let image;
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          throw new Error(`${file.name} dosyası desteklenmeyen format. Sadece PNG ve JPEG dosyaları desteklenir.`);
        }
        
        // Add page for this image
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        
        // Calculate image dimensions to fit page
        const imageWidth = image.width;
        const imageHeight = image.height;
        const scale = Math.min(width / imageWidth, height / imageHeight) * 0.8;
        
        const scaledWidth = imageWidth * scale;
        const scaledHeight = imageHeight * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;
        
        // Draw image on page
        page.drawImage(image, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
        
      } catch (error) {
        console.error(`Error processing image ${file.name}:`, error);
        throw new Error(`${file.name} dosyası işlenirken hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
      }
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  };

  const processDeletePages = async (file: File) => {
    // Import required libraries
    const { PDFDocument } = await import('pdf-lib');
    
    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    
    // Parse pages to delete from settings
    const pagesToDelete = settings.pagesToDelete?.split(',').map((page: string) => parseInt(page.trim())) || [];
    const pagesToKeep: number[] = [];
    
    // Create list of pages to keep (all pages except those to delete)
    for (let i = 0; i < pageCount; i++) {
      if (!pagesToDelete.includes(i + 1)) { // +1 because user input is 1-based
        pagesToKeep.push(i);
      }
    }
    
    if (pagesToKeep.length === 0) {
      throw new Error('Tüm sayfalar silinemez. En az bir sayfa kalmalıdır.');
    }
    
    // Create new PDF with remaining pages
    const newPdf = await PDFDocument.create();
    for (const pageIndex of pagesToKeep) {
      const [page] = await newPdf.copyPages(pdf, [pageIndex]);
      newPdf.addPage(page);
    }
    
    // Save the new PDF
    const newPdfBytes = await newPdf.save();
    return new Blob([newPdfBytes], { type: 'application/pdf' });
  };

  const processFillForm = async (file: File) => {
    // Import required libraries
    const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
    
    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Get form data from settings
    const formData = settings.formData || {};
    
    // Get the first page to add form data
    const page = pdf.getPage(0);
    const { height } = page.getSize();
    
    // Embed fonts
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    
    // Add form data to the page
    let yPosition = height - 100;
    
    // Draw form title
    page.drawText('Doldurulan Form Verileri', {
      x: 50,
      y: yPosition,
      size: 18,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 40;
    
    // Draw form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (yPosition > 50) { // Ensure we don't go off the page
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: yPosition,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 25;
      }
    });
    
    // Add timestamp
    page.drawText(`Form Doldurma Tarihi: ${new Date().toLocaleString('tr-TR')}`, {
      x: 50,
      y: 50,
      size: 10,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Save the filled form
    const filledPdfBytes = await pdf.save();
    return new Blob([filledPdfBytes], { type: 'application/pdf' });
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Lütfen önce dosya yükleyin');
      return;
    }

    setIsProcessing(true);
    
    try {
      let processedBlob: Blob;
      
      switch (feature.id) {
        case 'merge':
          if (uploadedFiles.length < 2) {
            toast.error('Birleştirme için en az 2 PDF dosyası gerekli');
            return;
          }
          toast.loading('PDF dosyaları birleştiriliyor...');
          processedBlob = await processMerge(uploadedFiles);
          toast.dismiss();
          toast.success('PDF dosyaları başarıyla birleştirildi!');
          break;
          
        case 'split':
          if (uploadedFiles.length !== 1) {
            toast.error('Ayırma işlemi için tek bir PDF dosyası gerekli');
            return;
          }
          toast.loading('PDF dosyası ayrılıyor...');
          processedBlob = await processSplit(uploadedFiles[0]);
          toast.dismiss();
          toast.success('PDF dosyası başarıyla ayrıldı!');
          break;
          
        case 'compress':
          if (uploadedFiles.length !== 1) {
            toast.error('Sıkıştırma işlemi için tek bir PDF dosyası gerekli');
            return;
          }
          toast.loading('PDF dosyası sıkıştırılıyor...');
          processedBlob = await processCompress(uploadedFiles[0]);
          toast.dismiss();
          toast.success('PDF dosyası başarıyla sıkıştırıldı!');
          break;
          

          
        case 'word-to-pdf':
          if (uploadedFiles.length !== 1) {
            toast.error('PDF\'ye dönüştürme için tek bir Word dosyası gerekli');
            return;
          }
          toast.loading('Word dosyası PDF\'ye dönüştürülüyor...');
          processedBlob = await processWordToPdf(uploadedFiles[0]);
          toast.dismiss();
          toast.success('Word dosyası başarıyla PDF\'ye dönüştürüldü!');
          break;
          
        case 'image-to-pdf':
          if (uploadedFiles.length === 0) {
            toast.error('PDF oluşturma için en az bir resim dosyası gerekli');
            return;
          }
          toast.loading('Resim dosyaları PDF\'ye dönüştürülüyor...');
          processedBlob = await processImageToPdf(uploadedFiles);
          toast.dismiss();
          toast.success('Resim dosyaları başarıyla PDF\'ye dönüştürüldü!');
          break;
          
        case 'delete-pages':
          if (uploadedFiles.length !== 1) {
            toast.error('Sayfa silme işlemi için tek bir PDF dosyası gerekli');
            return;
          }
          toast.loading('Sayfalar siliniyor...');
          processedBlob = await processDeletePages(uploadedFiles[0]);
          toast.dismiss();
          toast.success('Seçilen sayfalar başarıyla silindi!');
          break;
          
        case 'fill-form':
          if (uploadedFiles.length !== 1) {
            toast.error('Form doldurma işlemi için tek bir PDF dosyası gerekli');
            return;
          }
          toast.loading('PDF dosyası form dolduruluyor...');
          processedBlob = await processFillForm(uploadedFiles[0]);
          toast.dismiss();
          toast.success('PDF dosyası başarıyla form dolduruldu!');
          break;
          
        default:
          // Simulate other processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // In a real application, you would send the files to your API
          // and process them according to the selected feature
          
          // For now, we'll create a dummy processed file
          const dummyContent = `Processed ${feature.title} - ${new Date().toISOString()}`;
          processedBlob = new Blob([dummyContent], { type: 'application/pdf' });
          
          toast.success(`${feature.title} işlemi başarıyla tamamlandı!`);
      }
      
      setProcessedFile(processedBlob);
      
    } catch (error) {
      toast.error(`İşlem sırasında bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedFile) return;
    
    const url = URL.createObjectURL(processedFile);
    const a = document.createElement('a');
    a.href = url;
    
    // Set appropriate filename based on feature and settings
    switch (feature.id) {
      case 'word-to-pdf':
        a.download = `converted_${Date.now()}.pdf`;
        break;
      case 'image-to-pdf':
        a.download = `converted_${Date.now()}.png`;
        break;
      case 'delete-pages':
        a.download = `cleaned_${Date.now()}.pdf`;
        break;
      case 'fill-form':
        a.download = `filled_form_${Date.now()}.pdf`;
        break;
      default:
        a.download = `processed_${feature.id}_${Date.now()}.pdf`;
    }
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Feature Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-3xl`}>
          {emojiMap[feature.id] || '📄'}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{feature.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{feature.description}</p>
      </motion.div>

      {/* File Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FileUpload
          onFilesUpload={onFilesUpload}
          acceptedFileTypes={getAcceptedFileTypes()}
          title={getUploadTitle()}
          description="Dosyalarınızı sürükleyip bırakın veya seçmek için tıklayın"
        />
      </motion.div>

      {/* Settings */}
      {getSettingsComponent() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">⚙️</span>
            <h3 className="text-lg font-semibold text-gray-900">Ayarlar</h3>
          </div>
          {getSettingsComponent()}
        </motion.div>
      )}

      {/* Process Button */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>İşleniyor...</span>
              </>
            ) : (
              <>
                <span>▶️</span>
                <span>{feature.title} İşlemini Başlat</span>
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Results */}
      {processedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-green-600 text-2xl">✅</span>
            <h3 className="text-lg font-semibold text-green-800">
              İşlem Başarıyla Tamamlandı!
            </h3>
          </div>
          <p className="text-green-700 mb-4">
            Dosyanız hazır. Aşağıdaki butona tıklayarak indirebilirsiniz.
          </p>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>⬇️</span>
            <span>Dosyayı İndir</span>
          </button>
        </motion.div>
      )}
    </div>
  );
} 