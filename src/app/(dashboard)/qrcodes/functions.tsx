"use client";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";

export const downloadQrCode = (
  url: string,
  fileName: string,
  fileType: "png" | "pdf" | "svg",
) => {
  const downloadHandlers = {
    pdf: downloadQrCodePDF,
    png: downloadQrCodePNG,
    svg: downloadQrCodeSVG,
  };

  const downloadFn = downloadHandlers[fileType];
  return downloadFn(url, fileName);
};

const downloadQrCodePNG = (url: string, fileName: string) => {
  // Create a temporary div to render the QR code
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px"; // hide it offscreen
  document.body.appendChild(container);

  // Use React 18 createRoot
  const root = createRoot(container);
  root.render(
    <QRCodeCanvas
      value={url}
      size={200}
      bgColor="#ffffff"
      fgColor="#000000"
      level="H"
    />,
  );

  // Wait a tick to ensure canvas renders
  setTimeout(() => {
    const canvas = container.querySelector("canvas");
    if (!canvas) return;

    // Convert canvas to PNG and download
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = fileName;
    link.click();

    // Cleanup
    root.unmount();
    document.body.removeChild(container);
  }, 100); // small delay to let canvas render
};

const downloadQrCodeSVG = (value: string, fileName: string) => {
  // Create a temporary div to render the QR code
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<QRCodeSVG value={value} />); // no fixed size

  setTimeout(() => {
    const svg = container.querySelector("svg");
    if (!svg) return;

    // Optional: remove unnecessary width/height to rely on viewBox scaling
    svg.removeAttribute("width");
    svg.removeAttribute("height");

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const urlBlob = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(urlBlob);
    root.unmount();
    document.body.removeChild(container);
  }, 100);
};

const downloadQrCodePDF = (url: string, fileName: string) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(
    <QRCodeCanvas
      value={url}
      size={256}
      bgColor="#ffffff"
      fgColor="#000000"
      level="H"
    />,
  );

  setTimeout(() => {
    const canvas = container.querySelector("canvas");
    if (!canvas) {
      root.unmount();
      document.body.removeChild(container);
      return;
    }

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const qrCodeSize = 80;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const x = (pageWidth - qrCodeSize) / 2;
    const y = (pageHeight - qrCodeSize) / 2;

    pdf.addImage(imageData, "PNG", x, y, qrCodeSize, qrCodeSize);
    pdf.save(fileName);

    root.unmount();
    document.body.removeChild(container);
  }, 100);
};
