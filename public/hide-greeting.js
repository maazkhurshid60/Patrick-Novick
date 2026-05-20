(function () {
  var keywords = ["start a conversation", "Welcome", "Let\u2019s start", "Let's start"];

  function hideGreeting() {
    document.querySelectorAll("*").forEach(function (el) {
      var text = el.innerText || el.textContent || "";
      text = text.trim();
      var matched = keywords.some(function (k) { return text.includes(k); });
      if (!matched) return;

      var node = el;
      for (var i = 0; i < 8; i++) {
        if (!node || node === document.body) break;
        var st = window.getComputedStyle(node);
        if (st.position === "fixed" || st.position === "absolute") {
          var hasOnlyIcon = node.querySelector("svg") && (node.innerText || "").trim().length < 5;
          if (!hasOnlyIcon) {
            node.style.setProperty("display", "none", "important");
            return;
          }
        }
        node = node.parentElement;
      }
    });

    document.querySelectorAll("iframe").forEach(function (frame) {
      try {
        var doc = frame.contentDocument || frame.contentWindow.document;
        doc.querySelectorAll("*").forEach(function (el) {
          var text = (el.innerText || el.textContent || "").trim();
          var matched = keywords.some(function (k) { return text.includes(k); });
          if (matched && el.children.length === 0) {
            var bubble = el.parentElement;
            if (bubble) bubble.style.setProperty("display", "none", "important");
          }
        });
      } catch (e) { /* cross-origin iframe */ }
    });
  }

  var observer = new MutationObserver(function () { hideGreeting(); });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  [500, 1500, 3000, 6000].forEach(function (t) { setTimeout(hideGreeting, t); });
})();
