(function () {
  "use strict";

  var storageKey = "landor-cookie-consent";

  try {
    if (localStorage.getItem(storageKey)) return;
  } catch (error) {
    // Continue without persistence when browser storage is unavailable.
  }

  var popup = document.createElement("aside");
  popup.className = "cookie-consent-popup tp-bg-gray br-20";
  popup.setAttribute("role", "region");
  popup.setAttribute("aria-label", "Cookie consent");
  popup.setAttribute("aria-live", "polite");
  popup.innerHTML =
    '<p class="cookie-consent-popup__message">We use cookies to improve your experience.</p>' +
    '<div class="cookie-consent-popup__actions">' +
    '<button class="tp-btn" type="button" data-cookie-consent="allow"><span class="tp-btn-text">Allow</span><span class="tp-btn-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 10.75L10.75 0.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.75 0.75H10.75V10.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
    '<button class="tp-btn tp-btn-border" type="button" data-cookie-consent="deny"><span class="tp-btn-text">Deny</span><span class="tp-btn-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 10.75L10.75 0.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.75 0.75H10.75V10.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
    '</div>';

  popup.querySelectorAll("[data-cookie-consent]").forEach(function (button) {
    button.addEventListener("click", function () {
      try {
        localStorage.setItem(storageKey, button.getAttribute("data-cookie-consent"));
      } catch (error) {
        // Dismiss the prompt for this visit even if storage is unavailable.
      }
      popup.remove();
    });
  });

  document.body.appendChild(popup);
})();