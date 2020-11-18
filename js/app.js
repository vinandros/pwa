if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((res) => console.log("Se instalo correctamente... ", res))
    .catch((error) => console.log("No se pudo instalar... ", error));
} else {
  console.log("Service worker no soportado");
}
