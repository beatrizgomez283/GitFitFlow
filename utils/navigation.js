export function addBackButton(text, callback) {
  const container = document.getElementById("back-button-container");

  // Verificamos si ya existe un botón en el contenedor
  let existingBtn = container.querySelector('button');
  if (existingBtn) {
    existingBtn.remove();
  }

  const backBtn = document.createElement("button");
  backBtn.innerText = text;
  backBtn.onclick = callback;
  container.appendChild(backBtn);
}
