const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target =  document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => { tabContent.classList.remove('active') })
        target.classList.add('active')
    })
})

function change(element) {
    element.classList.toggle("fullsize")
}

function uploadTemplate() {
  const fileInput = document.getElementById('template-upload');
  const message = document.getElementById('upload-message');
  const container = document.getElementById('templates-container');

  if (fileInput.files.length === 0) {
      message.textContent = "Please select a file.";
      return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const templateDiv = document.createElement('div');
      templateDiv.className = 'template';
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      let mediaElement;
      let downloadLink;

      const dataTabContent = document.createElement('div');
      dataTabContent.className = 'data-tab-content';

      if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif') {
          mediaElement = document.createElement('img');
          mediaElement.src = e.target.result;
          mediaElement.alt = fileName;
      } else if (fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg') {
          mediaElement = document.createElement('video');
          mediaElement.controls = true;
          mediaElement.src = e.target.result;
      } else {
          message.textContent = "Unsupported file type.";
          return;
      }

      dataTabContent.appendChild(mediaElement);
      templateDiv.appendChild(dataTabContent);

      downloadLink = document.createElement('a');
      downloadLink.href = e.target.result;
      downloadLink.download = fileName;
      downloadLink.textContent = "Download " + fileName;
      templateDiv.appendChild(downloadLink);
      container.appendChild(templateDiv);
      message.textContent = "File uploaded successfully!";
  }
  reader.readAsDataURL(file);
}
