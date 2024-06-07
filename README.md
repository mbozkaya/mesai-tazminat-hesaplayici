# Mesai ve Tazminat Hesaplayıcı

Bu proje, Türkiye'deki iş kanunlarına göre fazla mesai ücreti, kıdem tazminatı, ulusal bayram ve genel tatil ücretleri ve yıllık ücretli izin alacağını hesaplamanıza yardımcı olan bir uygulamadır. Proje, Vite altyapısı kullanılarak React.js ile geliştirilmiştir ve GitHub Pages üzerinde barındırılmaktadır.

## Özellikler

- **Fazla Mesai Ücreti Hesaplama**: İş Kanunu'na göre fazla mesai ücretinizi hesaplayın.
- **Kıdem Tazminatı Hesaplama**: Kıdem tazminatınızı hesaplayın.
- **Ulusal Bayram ve Genel Tatil Ücretleri**: Tatil günleri için alacağınız ücretleri hesaplayın.
- **Yıllık Ücretli İzin Alacağı**: Kullanılmayan yıllık izinler için alacağınız ücreti hesaplayın.

## Kullanım

Proje, belirli tarih aralıkları ve maaş verilerini alarak çeşitli hesaplamalar yapar. Kullanıcılar başlangıç ve bitiş tarihlerini, maaş verilerini ve gerekli diğer parametreleri girerek sonuçları alabilirler.

### Hesaplamalar ve Kaynaklar

1. **Fazla Mesai Ücreti Hesaplama**:
    - İş Kanunu'na göre fazla mesai ücreti hesaplanırken, normal saatlik ücretin 1.5 katı alınır.
    - [İş Kanunu Madde 41](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5)

2. **Kıdem Tazminatı Hesaplama**:
    - Kıdem tazminatı, çalışanın işten ayrılma nedenine ve çalışma süresine göre hesaplanır.
    - [İş Kanunu Madde 14](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=1475&MevzuatTur=1&MevzuatTertip=4)

3. **Ulusal Bayram ve Genel Tatil Ücretleri**:
    - Ulusal bayram ve genel tatil günlerinde çalışılan saatler için normal saatlik ücretin 2 katı ödenir.
    - [İş Kanunu Madde 47](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5)

4. **Yıllık Ücretli İzin Alacağı**:
    - Yıllık ücretli izin süresi, çalışanın hizmet süresine bağlı olarak belirlenir.
    - [İş Kanunu Madde 53](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5)

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir `pull request` gönderin veya bir `issue` açın. Her türlü katkı ve geri bildirimi memnuniyetle karşılıyoruz.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakınız.
