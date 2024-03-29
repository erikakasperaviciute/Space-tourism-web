//Hamburger menu

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");

  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

//Tabs

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.key === "ArrowRight") {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.key === "ArrowLeft") {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');
  // pakeistas į funkciją hideContent
  //   mainContainer
  //     .querySelectorAll('[role="tabpanel"]')
  //     .forEach((panel) => panel.setAttribute("hidden", true));

  showContent(mainContainer, [`#${targetPanel}`]);
  // pakeistas į funkciją showContent
  //   mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden");

  hideContent(mainContainer, "picture");
  // pakeistas į funkciją hideContent
  //   mainContainer
  //     .querySelectorAll("picture")
  //     .forEach((picture) => picture.setAttribute("hidden", true));

  showContent(mainContainer, [`#${targetImage}`]);
  // pakeistas į funkciją showContent
  //   mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
