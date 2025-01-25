// src/utils/pdfUtils.js
export function generatePDFBlobURL(base64String) {
    try {
      if (!base64String) {
        throw new Error("Invalid Base64 string: String is empty or undefined.");
      }
  
      // Remove the data:application/pdf;base64, prefix
      const prefix = "data:application/pdf;base64,";
      if (base64String.startsWith(prefix)) {
        base64String = base64String.slice(prefix.length);
      }
  
      const binaryString = window.atob(base64String);
      const binaryLength = binaryString.length;
      const bytes = new Uint8Array(binaryLength);
  
      for (let i = 0; i < binaryLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
  
      const blob = new Blob([bytes], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error generating PDF Blob URL:", error.message);
      return null;
    }
  }
  