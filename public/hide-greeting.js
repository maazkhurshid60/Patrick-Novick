(function () {
  function hideGreeting() {
    document.querySelectorAll("*").forEach(function (el) {
      var text = el.textContent && el.textContent.trim();
      if (
        el.children.length === 0 &&
        text &&
        (text.includes("start a conversation") || text.includes("Welcome"))
      ) {
        var bubble = el.parentElement;
        while (bubble && bubble !== document.body) {
          var style = window.getComputedStyle(bubble);
          if (style.position === "fixed" || style.position === "absolute") {
            bubble.style.display = "none";
            return;
          }
          bubble = bubble.parentElement;
        }
      }
    });
  }
  var observer = new MutationObserver(hideGreeting);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(hideGreeting, 2000);
  setTimeout(hideGreeting, 5000);
})();
