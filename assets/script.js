document.addEventListener('DOMContentLoaded', QRCodeGenerator);

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundMusic');
  audio.volume = 0.6;

  const playMusic = () => {
    audio.play();
    document.removeEventListener('click', playMusic);
  };

  document.addEventListener('click', playMusic);

  document.addEventListener('visibilitychange', () => {
    document.hidden ? audio.pause() : audio.play().catch(() => {});
  });
});



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