let tabBtns = [];
let tabPanels = {};

// Get all tab buttons
tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
for (let i = 0; i < tabBtns.length; i++) {
    // Add event listener for click event to activate the tab
    tabBtns[i].addEventListener("click", function(e) { selectTab(e.target); }, false);
    // Add event listener for keydown event to handle keyboard interactions
    tabBtns[i].addEventListener("keydown", handleTabKeyDown, false);
}

// Get all tab panels and store them in tabPanels object
let x = document.querySelectorAll(".tabPanel");
for (let i = 0; i < x.length; i++) {
    tabPanels[x[i].id] = x[i];
}

// Function to handle keydown events on tabs
function handleTabKeyDown(e) {
    let key = e.keyCode;

    switch(key) {
        case 37: // Left arrow
        case 38: // Up arrow
            e.preventDefault();
            // Move focus to previous tab and activate it
            focusPreviousTab(e.target);
            break;
        case 39: // Right arrow
        case 40: // Down arrow
            e.preventDefault();
            // Move focus to next tab and activate it
            focusNextTab(e.target);
            break;
        case 13: // Enter
        case 32: // Space
            e.preventDefault();
            // Activate the currently focused tab
            selectTab(e.target);
            break;
        default:
            break;
    }
}

// Function to focus and activate the next tab
function focusNextTab(currentTab) {
    let index = tabBtns.indexOf(currentTab);
    let nextIndex = (index + 1) % tabBtns.length;
    selectTab(tabBtns[nextIndex]);
}

// Function to focus and activate the previous tab
function focusPreviousTab(currentTab) {
    let index = tabBtns.indexOf(currentTab);
    let prevIndex = (index - 1 + tabBtns.length) % tabBtns.length;
    selectTab(tabBtns[prevIndex]);
}

// Function to select and activate a tab
function selectTab(tabBtn) {
    let selectedTab = tabBtn;
    let tabPanelID = selectedTab.getAttribute('aria-controls');

    for (let i = 0; i < tabBtns.length; i++) {
        if (tabBtns[i] === selectedTab) {
            // Show the selected panel
            tabPanels[tabPanelID].classList.remove("hidden");
            // Remove tabindex to make the tab focusable
            tabBtns[i].removeAttribute("tabindex");
            // Add selected styling to the tab
            tabBtns[i].parentNode.classList.add("selectedTab");
            // Set aria-selected="true" on the selected tab
            tabBtns[i].setAttribute("aria-selected", "true");
            // Remove aria-hidden from the selected panel
            tabPanels[tabPanelID].removeAttribute("aria-hidden");
            // Set focus on the selected tab
            tabBtns[i].focus();
        } else {
            // Get the panel ID from aria-controls
            let otherTabPanelID = tabBtns[i].getAttribute('aria-controls');
            // Hide other panels
            tabPanels[otherTabPanelID].classList.add("hidden");
            // Set tabindex="-1" to skip non-selected tabs in tab order
            tabBtns[i].setAttribute("tabindex", "-1");
            // Remove selected styling from other tabs
            tabBtns[i].parentNode.classList.remove("selectedTab");
            // Set aria-selected="false" on non-selected tabs
            tabBtns[i].setAttribute("aria-selected", "false");
            // Set aria-hidden="true" on hidden panels
            tabPanels[otherTabPanelID].setAttribute("aria-hidden", "true");
        }
    }
} // End of selectTab