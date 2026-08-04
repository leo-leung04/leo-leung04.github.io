const profilePhotoHover = (() => {
  const initializeProfilePhotoHover = (documentObject, random = Math.random) => {
    const container = documentObject.querySelector(".profile-image-swap");
    if (!container) return;

    const hoverImages = Array.from(container.querySelectorAll(".profile-hover-image"));
    if (hoverImages.length === 0) return;

    const clearActiveImage = () => {
      hoverImages.forEach((image) => image.classList.toggle("is-active", false));
    };

    container.addEventListener("pointerenter", () => {
      const selectedIndex = Math.floor(random() * hoverImages.length);
      hoverImages.forEach((image, index) => image.classList.toggle("is-active", index === selectedIndex));
    });

    container.addEventListener("pointerleave", clearActiveImage);
  };

  return { initializeProfilePhotoHover };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = profilePhotoHover;
}

if (typeof document !== "undefined") {
  profilePhotoHover.initializeProfilePhotoHover(document);
}
