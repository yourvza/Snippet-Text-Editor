const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferrePrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Retrieve the deferred prompt event from the global window object
  const installPrompt = window.deferredPrompt;

  // Check if there is a prompt event available
  if (installPrompt) {
    installPrompt.prompt();

    // Reset the deferred prompt since it can only be used once
    window.deferredPrompt = null;

    // Hide the install button after prompting
    butInstall.classList.add("hidden");
  } else {
    // If there is no deferred prompt event, do nothing or handle accordingly
    console.log("No deferred prompt available.");
  }
});
// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
