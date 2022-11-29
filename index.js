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
import {initEditRefereePassword} from "./pages/editRefereePassword/editRefereePassword.js"
import {initMatch} from "./pages/match/match.js"
import {initGetReferees} from "./pages/getReferees/getReferees.js"
import {initMakeAdmin} from "./pages/makeAdmin/makeAdmin.js"
import {initMyProfile} from "./pages/myProfile/myProfile.js"
import {initLogout} from "./pages/logout/logout.js"


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
  const templateEditRefereePassword = await loadHtml("./pages/editRefereePassword/editRefereePassword.html")
  const templateGetReferees = await loadHtml("./pages/getReferees/getReferees.html")
  const templateMakeAdmin = await loadHtml("./pages/makeAdmin/makeAdmin.html")
  const templateMyProfile = await loadHtml("./pages/myProfile/myProfile.html")
  const templateLogout = await loadHtml("./pages/logout/logout.html")

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
      "/createReferee": () => {
        renderTemplate(templateCreateReferee, "content");
        initCreateReferee();
      },
      "editReferee": () => {
        renderTemplate(templateEditReferee, "content")
        initEditReferee();
      },
      "editRefereePassword" : () => {
        renderTemplate(templateEditRefereePassword, "content")
        initEditRefereePassword();
      },
      "/getReferees" : () =>{
        renderTemplate(templateGetReferees, "content")
        initGetReferees();
      },
        "/makeAdmin" : () => {
        renderTemplate(templateMakeAdmin, "content")
        initMakeAdmin();
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
      "/logout": () => {
        renderTemplate(templateLogout, "content");
        initLogout();
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
      }, "/myProfile": () => {
        renderTemplate(templateMyProfile, "content");
        initMyProfile();
      }

    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
