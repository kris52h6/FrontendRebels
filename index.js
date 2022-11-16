import "https://unpkg.com/navigo";
import {
  adjustForMissingHash,
  loadHtml,
  renderTemplate,
  setActiveLink,
} from "./utils.js";

import { initTemplate } from "./pages/template/template.js";

window.addEventListener("load", async () => {
  const templateTemplate = await loadHtml("./pages/template/template.html");
  const templateHome = await loadHtml("./pages/home/home.html");
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      "/": () => {
        renderTemplate(templateHome, "content");
      },
      "/template": () => {
        renderTemplate(templateTemplate, "content");
        initTemplate();
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
