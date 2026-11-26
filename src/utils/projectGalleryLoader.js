const PROJECT1_MODULES = import.meta.glob( // Poject 1 - Meta Global
  "../assets/project1/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const PROJECT2_MODULES = import.meta.glob( // Project 2 - Meta Global
  "../assets/project2/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

function formatFileNameToCaption(filePath) {
  const fileNameWithExt = filePath.split("/").pop() || "";
  const baseName = fileNameWithExt.replace(/\.[^/.]+$/, "");

  const spaced = baseName
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function buildProject1Gallery(customCaptions = {}) { // Project 1 Cast
  return Object.entries(PROJECT1_MODULES)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
      const fileName = path.split("/").pop() || "";
      const baseName = fileName.replace(/\.[^/.]+$/, "");
      const caption =
        customCaptions[fileName] ||
        customCaptions[baseName] ||
        formatFileNameToCaption(path);

      return { src, caption };
    });
}

export function buildProject2Gallery(customCaptions = {}) { // Project 2 Cast
  return Object.entries(PROJECT2_MODULES)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
      const fileName = path.split("/").pop() || "";
      const baseName = fileName.replace(/\.[^/.]+$/, "");
      const caption =
        customCaptions[fileName] ||
        customCaptions[baseName] ||
        formatFileNameToCaption(path);

      return { src, caption };
    });
}