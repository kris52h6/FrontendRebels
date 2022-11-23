import "https://unpkg.com/navigo";
import {
  adjustForMissingHash,
  loadHtml,
  renderTemplate,
  setActiveLink,
  checkAccess
} from "./utils.js";

import { initTemplate } from "./pages/template/template.js";
import {initLogin} from "./pages/login/login.js";
import {initCheckAccess} from "./pages/admintest/admintest.js";

window.addEventListener("load", async () => {
  const templateTemplate = await loadHtml("./pages/template/template.html");
  const templateHome = await loadHtml("./pages/home/home.html");
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html");
  const templateLogin = await loadHtml("./pages/login/login.html");
  const templateAdmintest = await loadHtml("./pages/admintest/admintest.html");
  const templateDommertest = await loadHtml("./pages/dommertest/dommertest.html")

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
      "/login": () => {
        renderTemplate(templateLogin, "content");
        initLogin();  
      },


      "/admintest": () => {
        const hasAccess = checkAccess("admin").then(result =>{

          if(result){
            console.log("Sucess")
            renderTemplate(templateAdmintest,"content");
            initCheckAccess();
          }
          else{
            console.log("Failed")
            renderTemplate(templateHome, "content");
          } } )
      },

      "/dommertest": () => {
        const hasAccess = checkAccess("dommer").then(result =>{

          if(result){
            console.log("Sucess")
            renderTemplate(templateDommertest,"content");
            initCheckAccess();
          }
          else{
            console.log("Failed")
            renderTemplate(templateHome, "content");
          } } )
      }
      
    })

    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
