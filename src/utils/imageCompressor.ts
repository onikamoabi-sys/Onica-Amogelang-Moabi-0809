/**
 * Image compression and optimization utility for client-side storage.
 * Resizes large images to reasonable display dimensions and compresses to JPEG/WebP
 * reducing multi-megabyte uploads down to ~50KB-150KB.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  mimeType?: 'image/jpeg' | 'image/webp';
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  mimeType: 'image/jpeg'
};

/**
 * Compresses an image File or Blob and returns a base64 Data URL.
 */
export async function compressImageFile(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<string> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (file.type && !file.type.startsWith('image/')) {
      return reject(new Error('File is not an image'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        return reject(new Error('Failed to convert file to data URL'));
      }
      compressDataUrl(dataUrl, mergedOptions)
        .then(resolve)
        .catch(reject);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an existing base64 Data URL to fit within target dimensions and quality.
 */
export async function compressDataUrl(
  dataUrl: string,
  options: CompressionOptions = {}
): Promise<string> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.8, mimeType = 'image/jpeg' } = options;

  // If it's already an external HTTP/HTTPS URL or SVG, don't recompress
  if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://') || dataUrl.startsWith('data:image/svg+xml')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      let { width, height } = img;

      // Scale dimensions down if larger than max
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback to original if canvas context unavailable
        return resolve(dataUrl);
      }

      // Fill white background for transparent images converted to JPEG
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#121216';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      try {
        const compressed = canvas.toDataURL(mimeType, quality);
        // Only return compressed if it's actually smaller or valid
        if (compressed && compressed.length < dataUrl.length) {
          resolve(compressed);
        } else {
          // If original was already smaller or compressed is bigger, resolve compressed anyway if it's within limits
          resolve(compressed || dataUrl);
        }
      } catch {
        resolve(dataUrl);
      }
    };

    img.onerror = () => {
      // If error loading, resolve original dataUrl safely
      resolve(dataUrl);
    };

    img.src = dataUrl;
  });
}

/**
 * Approximate size in kilobytes of a string (useful for monitoring data size).
 */
export function getApproximateSizeInKB(str: string): number {
  return Math.round((str.length * 2) / 1024);
}
