import "https://unpkg.com/navigo";
import {
  adjustForMissingHash,
  loadHtml,
  renderTemplate,
  setActiveLink,
  checkAccess
} from "./utils.js";

import { initAllMatches } from "./pages/allMatches/allMatches.js";
import {initLogin} from "./pages/login/login.js";
import {initCheckAccess} from "./pages/admintest/admintest.js";
import {initCreateUser} from "./pages/createUser/createUser.js";
import {initCreateReferee} from "./pages/createReferee/createReferee.js";
import {initEditReferee} from "./pages/editReferee/editReferee.js"
import {initMatch} from "./pages/match/match.js"

window.addEventListener("load", async () => {
  const templateMatches = await loadHtml("./pages/allMatches/allMatches.html");
  const templateMatch = await loadHtml("./pages/match/match.html")
  const templateHome = await loadHtml("./pages/home/home.html");
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html");
  const templateLogin = await loadHtml("./pages/login/login.html");
  const templateAdmintest = await loadHtml("./pages/admintest/admintest.html");
  const templateDommertest = await loadHtml("./pages/dommertest/dommertest.html")
  const templateCreateUser = await loadHtml("./pages/createUser/createUser.html")
  const templateCreateReferee = await loadHtml("./pages/createReferee/createReferee.html")
  const templateEditReferee = await loadHtml("./pages/editReferee/editReferee.html")

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
      "/matches": () => {
        renderTemplate(templateMatches, "content");
        initAllMatches();
      },
      "/match": () => {
        renderTemplate(templateMatch, "content")
        initMatch();
      },
      "/login": () => {
        renderTemplate(templateLogin, "content");
        initLogin();  
      },
      "/createUser": () => {
        renderTemplate(templateCreateUser, "content");
        initCreateUser();
      },
      "/createReferee": () => {
        renderTemplate(templateCreateReferee, "content");
        initCreateReferee();
      },
      "editReferee": () => {
        renderTemplate(templateEditReferee, "content")
        initEditReferee();
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
