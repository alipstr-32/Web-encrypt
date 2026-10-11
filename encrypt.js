// Web Crypto API AES-256-GCM Encryption Engine
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
}

async function encryptFile(file, password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const fileBuffer = await file.arrayBuffer();

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    fileBuffer
  );

  // Package metadata and ciphertext into .alipenc container format
  const metaData = JSON.stringify({ name: file.name, type: file.type });
  const metaEncoder = new TextEncoder();
  const metaBytes = metaEncoder.encode(metaData);
  const metaLen = new Uint32Array([metaBytes.byteLength]);

  const combined = new Uint8Array(
    4 + metaBytes.byteLength + salt.byteLength + iv.byteLength + ciphertext.byteLength
  );
  
  let offset = 0;
  combined.set(new Uint8Array(metaLen.buffer), offset);
  offset += 4;
  combined.set(metaBytes, offset);
  offset += metaBytes.byteLength;
  combined.set(salt, offset);
  offset += salt.byteLength;
  combined.set(iv, offset);
  offset += iv.byteLength;
  combined.set(new Uint8Array(ciphertext), offset);

  return new Blob([combined], { type: 'application/octet-stream' });
}
