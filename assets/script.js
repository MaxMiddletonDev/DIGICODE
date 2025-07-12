document.addEventListener('DOMContentLoaded', QRCodeGenerator);

function QRCodeGenerator() {
  const input = document.getElementById('searchUrl');
  const generateButton = document.getElementById('generateQrCode');
  const qrCodeImage = document.getElementById('qrCodeImage');

  generateButton.addEventListener('click', async () => {
    const dataUrl = await QRCode.toDataURL(input.value);
    qrCodeImage.src = dataUrl;
    qrCodeImage.style.display = 'block';
    input.value = '';
  });
}