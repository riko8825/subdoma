/* UAB Subdoma — Silktide Consent Manager init (LT)
 * 3 kategorijos: Necessary (forced) / Analytics / Advertising
 * Sync'inta su Google Consent Mode V2 (gtag).
 */
window.silktideConsentManager.init({
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieBanner: {
    position: "bottomLeft"
  },
  text: {
    banner: {
      description:
        "<p>Naudojame slapukus, kad svetainė tinkamai veiktų, suprastume kaip ji naudojama ir galėtume tobulinti turinį. Pasirinkite, kuriuos slapukus leidžiate.</p>",
      acceptAllButtonText: "Sutinku su visais",
      acceptAllButtonAccessibleLabel: "Sutikti su visais slapukais",
      rejectNonEssentialButtonText: "Tik būtini",
      rejectNonEssentialButtonAccessibleLabel: "Atmesti neprivalomus slapukus",
      preferencesButtonText: "Nustatymai",
      preferencesButtonAccessibleLabel: "Slapukų nustatymai"
    },
    preferences: {
      title: "Slapukų nustatymai",
      description:
        "<p>Šie nustatymai leidžia jums kontroliuoti, kaip svetainė naudoja slapukus. Daugiau informacijos — <a href=\"/privatumas/\">privatumo politikoje</a>.</p>",
      creditLinkText: "",
      creditLinkAccessibleLabel: ""
    }
  },
  consentTypes: [
    {
      id: "necessary",
      name: "Būtini",
      description:
        "<p>Reikalingi tinkamam svetainės veikimui (sesija, formos, slapukų sutikimo įrašas). Be jų svetainė neveikia, todėl jų išjungti negalima.</p>",
      required: true
    },
    {
      id: "analytics",
      name: "Analitiniai",
      description:
        "<p>Padeda mums suprasti, kaip lankytojai naudoja svetainę, kad galėtume ją tobulinti (pvz. Google Analytics).</p>",
      defaultValue: false,
      onAccept: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", { analytics_storage: "granted" });
        }
      },
      onReject: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", { analytics_storage: "denied" });
        }
      }
    },
    {
      id: "advertising",
      name: "Rinkodaros",
      description:
        "<p>Naudojami personalizuotai reklamai ir remarketingui (pvz. Google Ads, Meta pikselis).</p>",
      defaultValue: false,
      onAccept: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted"
          });
        }
      },
      onReject: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
          });
        }
      }
    }
  ]
});
