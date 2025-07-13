var counter = 0;
const input = document.getElementById('searchUrl');
const generateButton = document.getElementById('generateQrCode');
const downloadButton = document.getElementById('downloadQrCode');
const openButton = document.getElementById('openQrCode');
const deleteButton = document.getElementById('deleteQrCode');
const qrCodeImage = document.getElementById('qrCodeImage');

document.addEventListener('DOMContentLoaded', qrCodeGenerator);
document.addEventListener('DOMContentLoaded', backgroundMusic);

function backgroundMusic() {
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
}

function qrCodeGenerator() {
  if (counter == 0) {
    qrCodeImage.src = 'assets/icons/question.png';
    qrCodeImage.style.display = 'block';
  }
  generateButton.addEventListener('click', async () => {
    if (!input.value.trim()) {
      counter++;
      switch (counter) {
        case 1:
          input.placeholder = 'PLEASE ENTER A URL';
          break;
        case 2:
          input.placeholder = 'JUST A URL, PLEASE';
          break;
        case 3:
          input.placeholder = 'REALLY, A URL WOULD BE NICE';
          break;
        case 4:
          input.placeholder = 'I NEED A URL TO WORK WITH';
          break;
        default:
          input.placeholder = 'OK, I GIVE UP';
          counter = 0;
          break;
      }
    if (counter > 0) {
      qrCodeImage.src = "assets/icons/wrong.png";
      qrCodeImage.style.display = 'block';
    }
    }
    if (input.value.trim()) {
      const dataUrl = await QRCode.toDataURL(input.value);
      qrCodeImage.src = dataUrl;
      qrCodeImage.style.display = 'block';
      input.value = '';
      counter = 0;
      input.placeholder = "ENTER A URL";
    }
  });
}