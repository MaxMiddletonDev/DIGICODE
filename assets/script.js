const input = document.getElementById('searchUrl');
const generateButton = document.getElementById('generateQrCode');
const downloadButton = document.getElementById('downloadQrCode');
const openButton = document.getElementById('openQrCode');
const deleteButton = document.getElementById('deleteQrCode');
const qrCodeImage = document.getElementById('qrCodeImage');

let counter = 0;
let defaultQrCodeDataUrl = '';
let lastGeneratedUrl = ''; 

document.addEventListener('DOMContentLoaded', qrCodeGenerator);
document.addEventListener('DOMContentLoaded', backgroundMusic);
document.addEventListener('DOMContentLoaded', downloadQrCode);
document.addEventListener('DOMContentLoaded', openQrCode);
document.addEventListener('DOMContentLoaded', deleteQrCode);

function downloadQrCode() {
  downloadButton.addEventListener('click', () => {
    if (defaultQrCodeDataUrl) {
      const link = document.createElement('a');
      link.href = defaultQrCodeDataUrl;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
}

function openQrCode() {
  openButton.addEventListener('click', () => {
    if (lastGeneratedUrl) { 
      window.open(lastGeneratedUrl, '_blank');
    }
  });
}

function deleteQrCode() {
  deleteButton.addEventListener('click', () => {
    qrCodeImage.src = '';
    qrCodeImage.src = 'assets/icons/question.png';
    input.value = '';
    defaultQrCodeDataUrl = '';
    lastGeneratedUrl = ''; 
    counter = 0;
    input.placeholder = "ENTER URL";
  });
}

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
  if (counter === 0) {
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
    } else {
      lastGeneratedUrl = input.value; 
      defaultQrCodeDataUrl = await QRCode.toDataURL(input.value);
      qrCodeImage.src = defaultQrCodeDataUrl;
      qrCodeImage.style.display = 'block';
      input.value = '';
      counter = 0;
      input.placeholder = "ENTER A URL";
    }
  });
}