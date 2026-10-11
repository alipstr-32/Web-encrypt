// Web Crypto API AES-256-GCM Decryption Engine
async function decryptFile(encryptedBuffer, password) {
  const dataView = new DataView(encryptedBuffer);
  let offset = 0;
  
  const metaLen = dataView.getUint32(offset, true);
  offset += 4;

  const metaBytes = new Uint8Array(encryptedBuffer, offset, metaLen);
  offset += metaLen;
  const meta = JSON.parse(new TextDecoder().decode(metaBytes));

  const salt = new Uint8Array(encryptedBuffer, offset, 16);
  offset += 16;

  const iv = new Uint8Array(encryptedBuffer, offset, 12);
  offset += 12;

  const ciphertext = encryptedBuffer.slice(offset);

  const key = await deriveKey(password, salt);

  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      ciphertext
    );
    return {
      blob: new Blob([decryptedBuffer], { type: meta.type || 'application/octet-stream' }),
      filename: meta.name || 'decrypted_file'
    };
  } catch (e) {
    throw new Error('Dekripsi gagal: Password salah atau file telah rusak/dimodifikasi.');
  }
}
