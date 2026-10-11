// Batch Processor Logic Handler for ALIP ENCRYPTOR
async function processBatchFiles(files, password, progressCallback) {
  let successCount = 0;
  let failedCount = 0;
  const total = files.length;

  for (let i = 0; i < total; i++) {
    const file = files[i];
    try {
      if (typeof progressCallback === 'function') {
        progressCallback(i + 1, total, file.name, 'Mengenkripsi...');
      }

      // Memanggil fungsi enkripsi dari encrypt.js
      const encryptedBlob = await encryptFile(file, password);
      downloadBlob(encryptedBlob, file.name + '.alipenc');
      
      // Update statistik sesi
      if (typeof StatsTracker !== 'undefined') {
        StatsTracker.update(true, file.size);
      }
      successCount++;
    } catch (err) {
      if (typeof StatsTracker !== 'undefined') {
        StatsTracker.update(false);
      }
      failedCount++;
      console.error(`Gagal memproses file ${file.name}:`, err);
    }
  }

  return { successCount, failedCount };
}
