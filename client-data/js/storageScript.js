(function storageScript() {
  // Local storage event listener
  console.log("ADDING LOCAL STORAGE EVENT");
  window.addEventListener("storage", function (event) {
    console.log("STORAGE UPDATED", event);
    if (event.key === "structure") {
      // Do something when local storage with key 'your_storage_key' changes
      const newValue = event.newValue; // The updated value in local storage
      console.log("Local storage updated:", newValue);
    }
  });
})();
