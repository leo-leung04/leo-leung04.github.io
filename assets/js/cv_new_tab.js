document.addEventListener("DOMContentLoaded", function () {
  const cvPaths = new Set(["/cv/", "/cv/index.html"]);

  document.querySelectorAll("a[href]").forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) {
      return;
    }

    try {
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin && cvPaths.has(url.pathname)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    } catch (_error) {
      // Ignore malformed links and leave them unchanged.
    }
  });
});
