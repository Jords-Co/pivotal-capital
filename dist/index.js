"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/digerati/skipToMainContent.ts
  var skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'), target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
      return;
    }
    ["click", "keypress"].forEach((event) => {
      trigger.addEventListener(event, (e) => {
        if (e.type === "keydown" && e.which !== 13) {
          return;
        }
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
      });
    });
  };

  // src/digerati/currentYear.ts
  var currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
      return;
    }
    const fullYear = (/* @__PURE__ */ new Date()).getFullYear();
    target.innerText = fullYear.toString();
  };

  // src/pivotalCapital/headingCircleHighlight.ts
  var headingCircleHighlight = () => {
    const circleWrappers = document.querySelectorAll('[dd-circle-highlight="wrapper"]'), circleElements = document.querySelectorAll('[dd-circle-highlight="element"]');
    if (!circleWrappers || !circleElements) {
      return;
    }
    circleWrappers.forEach((circleWrapper, index) => {
      let circleElement = circleElements[index];
      circleWrapper.innerHTML = '<span class="z-index-2">' + circleWrapper.textContent + "</span>";
      circleWrapper.appendChild(circleElement.cloneNode(true));
    });
  };

  // src/pivotalCapital/fixSafariClipPathBug.ts
  var fixSafariClipPathBug = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.indexOf("safari/") > -1 && userAgent.indexOf("chrome/") === 0;
    const clipPathElements = document.querySelectorAll('[dd-clip-path="true"]');
    if (!isSafari || !clipPathElements) {
      return;
    }
    clipPathElements.forEach((clipPathElement) => {
      clipPathElement.style.clipPath = "none";
    });
  };

  // src/index.ts
  window.Webflow || [];
  window.Webflow.push(() => {
    skipToMainContent();
    currentYear();
    headingCircleHighlight();
    fixSafariClipPathBug();
  });
})();
//# sourceMappingURL=index.js.map
