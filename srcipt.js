<<<<<<< HEAD
const settingsMenu = document.querySelector(".settings-menu");

function settingsMenuToggle() {
    settingsMenu.classList.toggle("settings-menu-height");
}

const darkBtn = document.getElementById("dark-btn");

darkBtn.addEventListener("click", () => {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    darkBtn.classList.add("dark-btn-on");
}



// document.querySelector(".user-profile").addEventListener("click", () => {
//     window.location.href = "profile.html";
=======
const settingsMenu = document.querySelector(".settings-menu");

function settingsMenuToggle() {
    settingsMenu.classList.toggle("settings-menu-height");
}

const darkBtn = document.getElementById("dark-btn");

darkBtn.addEventListener("click", () => {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    darkBtn.classList.add("dark-btn-on");
}



// document.querySelector(".user-profile").addEventListener("click", () => {
//     window.location.href = "profile.html";
>>>>>>> d64d64c07039ddeb8ed263369ed2a6a454272382
// });