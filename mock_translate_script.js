var google = {};
window.isTranslationRestored = false;
google.translate = (function() {
  return {
    TranslateService: function() {
      return {
        isAvailable: function() {
          return true;
        },
        restore: function() {
          isTranslationRestored = true;
        },
        getDetectedLanguage: function() {
          return 'und';
        },
        translatePage: function(sourceLang, targetLang, onTranslateProgress) {
          setTimeout(function() {
            onTranslateProgress(100, true, false);
          }, 8000);
        }
      };
    }
  };
})();
cr.googleTranslate.onTranslateElementLoad();