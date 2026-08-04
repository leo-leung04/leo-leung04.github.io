const profilePalette = (() => {
  const palettes = [
    ["#a8b0a0", "#c0a49a", "#d1c3a5", "#87979d", "#b5a5b1"],
    ["#8e9a8b", "#b7a49a", "#c8bfae", "#9ba6aa", "#a99ca6"],
    ["#96a3a6", "#c1b5a9", "#a9b3a0", "#d0b9af", "#8f8a9a"],
    ["#b7a08c", "#9eaa9a", "#c9b7a6", "#a7979c", "#d2c8b6"],
    ["#a3b0a2", "#d0b4ac", "#b6a7b4", "#c7c1a7", "#879a9d"],
    ["#8f9fa6", "#b4aaa0", "#c5b9a1", "#9ca58f", "#b09da5"],
    ["#a6aaa0", "#c4afa3", "#92a0a3", "#c7bfae", "#9f929f"],
    ["#9aa49a", "#b9a398", "#d0c2ae", "#89979f", "#aa9fa9"],
    ["#dbeff6", "#a8d8e3", "#5d7389", "#c5b8bf", "#e9dfe2"],
    ["#315f72", "#a3bab4", "#c99986", "#d7bdb9", "#e1d8d2"],
    ["#c7d280", "#856f8a", "#af98b6", "#e0c6e4", "#e9e2e8"],
    ["#47754e", "#a3baa5", "#86c9b1", "#b9d6d7", "#d2e1e1"],
    ["#c6dcbf", "#95ab85", "#586e65", "#aead77", "#686952"],
  ];

  const storageKey = "profile-palette-state";
  const pickRandom = (items, random) => items[Math.floor(random() * items.length)];
  const normalizePalette = (palette) => palette.map((color) => color.toUpperCase());

  const createPalette = (random, excludedPalette = null) => {
    const availablePalettes = excludedPalette
      ? palettes.filter((palette) => JSON.stringify(normalizePalette(palette)) !== JSON.stringify(excludedPalette))
      : palettes;

    return normalizePalette(pickRandom(availablePalettes, random));
  };

  const getSelectionTextColor = (hexColor) => {
    const red = Number.parseInt(hexColor.slice(1, 3), 16);
    const green = Number.parseInt(hexColor.slice(3, 5), 16);
    const blue = Number.parseInt(hexColor.slice(5, 7), 16);
    const perceivedBrightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return perceivedBrightness >= 150 ? "#1a1a1a" : "#ffffff";
  };

  const setSelectionColor = (documentObject, color) => {
    documentObject.documentElement.style.setProperty("--selection-background-color", color);
    documentObject.documentElement.style.setProperty("--selection-text-color", getSelectionTextColor(color));
  };

  const readStoredState = (storage) => {
    if (!storage) return null;

    try {
      const state = JSON.parse(storage.getItem(storageKey));
      const isValidPalette =
        Array.isArray(state?.palette) && state.palette.length === 5 && state.palette.every((color) => /^#[0-9A-F]{6}$/.test(color));

      if (!isValidPalette) return null;

      return {
        palette: state.palette,
        lockedColor: state.palette.includes(state.lockedColor) ? state.lockedColor : null,
      };
    } catch {
      return null;
    }
  };

  const storeState = (storage, state) => {
    if (!storage) return;

    try {
      storage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Selection colors still work within the current page when storage is unavailable.
    }
  };

  const initializeProfilePalette = (documentObject, random = Math.random, storage = null, navigationType = "navigate") => {
    const paletteElement = documentObject.querySelector(".profile-palette");
    const storedState = readStoredState(storage);
    const shouldRefreshPalette = Boolean(paletteElement) && navigationType === "reload";
    const selectedPalette = shouldRefreshPalette ? createPalette(random, storedState?.palette) : storedState?.palette || createPalette(random);
    let lockedColor = shouldRefreshPalette ? null : storedState?.lockedColor || null;
    let hasActiveSelection = false;

    storeState(storage, { palette: selectedPalette, lockedColor });

    const swatches = paletteElement ? Array.from(paletteElement.querySelectorAll(".profile-palette-swatch")) : [];

    const updateLockedSwatch = () => {
      swatches.forEach((swatch) => {
        const isSelected = swatch.dataset.color === lockedColor;
        swatch.classList.toggle("is-selected", isSelected);
        swatch.setAttribute("aria-pressed", String(isSelected));
      });
    };

    swatches.forEach((swatch, index) => {
      const color = selectedPalette[index];
      swatch.dataset.color = color;
      swatch.style.setProperty("--profile-palette-color", color);
      swatch.setAttribute("aria-label", `Use ${color} as text selection highlight`);
      swatch.addEventListener("click", () => {
        lockedColor = lockedColor === color ? null : color;
        storeState(storage, { palette: selectedPalette, lockedColor });
        updateLockedSwatch();
        setSelectionColor(documentObject, lockedColor || pickRandom(selectedPalette, random));
      });
    });

    updateLockedSwatch();
    setSelectionColor(documentObject, lockedColor || pickRandom(selectedPalette, random));

    documentObject.addEventListener("selectionchange", () => {
      const selection = documentObject.getSelection();
      const hasSelection = Boolean(selection && !selection.isCollapsed && selection.toString().length > 0);

      if (hasSelection && !hasActiveSelection && !lockedColor) {
        setSelectionColor(documentObject, pickRandom(selectedPalette, random));
      }

      hasActiveSelection = hasSelection;
    });
  };

  return { getSelectionTextColor, initializeProfilePalette };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = profilePalette;
}

if (typeof document !== "undefined") {
  let storage = null;
  let navigationType = "navigate";

  try {
    storage = window.sessionStorage;
  } catch {
    // Continue without cross-page persistence when session storage is unavailable.
  }

  try {
    const navigationEntry = window.performance.getEntriesByType("navigation")[0];
    navigationType = navigationEntry?.type || navigationType;
  } catch {
    // Treat unknown navigation types as a normal page visit.
  }

  profilePalette.initializeProfilePalette(document, Math.random, storage, navigationType);
}
