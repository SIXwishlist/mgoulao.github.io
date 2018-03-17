'use strict';

function getMonth(m) {
    switch (m) {
        case 1: m = "JAN";
            break;
        case 2: m = "FEB";
            break;
        case 3: m = "MAR";
            break;
        case 4: m = "APR";
            break;
        case 5: m = "MAY";
            break;
        case 6: m = "JUN";
            break;
        case 7: m = "JUL";
            break;
        case 8: m = "AUG";
            break;
        case 9: m = "SEP";
            break;
        case 10: m = "OCT";
            break;
        case 11: m = "NOV";
            break;
        case 12: m = "DEC";
            break;
    }
    return m;
}

function getWeekDay(d) {
    var days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return days[d];
}
$(document).ready(function () {
    var navbarTime = $("#navbar_time");
    var navbar = $(".navbar");
    var homeButton = $("#home_button");
    var menu = $("#menu");
    var statusMenu = $("#menu_2");
    var home = $("#home");
    var appHistory = $("#app_history");
    var appContainer = $(".app_container");
    var lockScreen = $("#lockscreen");
    var lockOptionsButton = $("#lock_options_button");
    var lockOptions = $(".lock_options");
    var closeLockOptions = $("#lock_options_close");
    var guestButton = $("#lock_options_guest");
    var loginLoader = $("#login_loader");
    var lockHour = $("#lockscreen_hour");
    var batteryLevel = $(".battery_level");
    var batteryIcon = $(".battery_icon");
    var statusBar = $(".status_bar");
    var statusTime = $(".status_hour");
    var statusDay = $(".status_day");
    var statusUserImage = $(".fuchsia");
    var statusLocation = $(".status_location");
    var signOutButton = $(".signout");
    var searchInput = $(".search_input");
    var card = $(".card");
    var openedApp = $("#opened_app");
    var openedAppContent = $("#app_content");
    var openedAppHeader = $("#opened_app header");
    var openedAppObj;
    //Draggable
    var slideHeight = $('body').height() * 0.5;
    var homeMin = 0;
    var homeMax = -slideHeight;
    var appHistoryslideHeight = -appHistory.height() * 0.75;
    if ($("body").width() < 800) {
        appHistoryslideHeight = -appHistory.height() * 0.85;
        appHistory.css({ "top": appHistoryslideHeight });
    } else {
        appHistory.css({ "top": appHistoryslideHeight });
    }
    var appHistoryMin = 0;
    console.log("Max App", appHistory.height());
    var appHistoryMax = appHistoryslideHeight;

    //Date 
    var today = new Date();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    statusDay.text(getWeekDay(day) + ", " + getMonth(month) + " " + date);
    //Time
    function updateTime() {
        today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        if (m < 10) { m = "0" + m };

        statusTime.text(h + ":" + m);
        lockHour.text(h + ":" + m);
        setTimeout(updateTime, 30000);
    }
    updateTime();

    $(document).click(function () {
        if (statusMenu.hasClass("active")) {
            statusMenu.removeClass("active");
            showHome();
            showAppHistory();
        } else if (menu.hasClass("active")) {
            menu.removeClass("active");
        }
    });

    searchInput.click(function () {
        event.stopPropagation();
        home.css({ "top": homeMax + "px" });
        appHistory.css({ "transform": "translateY(" + homeMax + "px)" });
    });

    lockOptionsButton.click(function () {
        lockOptionsButton.hide();
        lockOptions.addClass("active");
    });

    closeLockOptions.click(function () {
        lockOptions.removeClass("active");
        lockOptionsButton.show();
    });

    guestButton.click(function () {
        lockHour.hide();
        loginLoader.show();
        setTimeout(function () {
            loginLoader.hide();
            lockScreen.hide();
            lockHour.show();
            lockOptionsButton.show();
            lockOptions.removeClass("active");
        }, 2000);

    });

    navbarTime.click(function () {
        event.stopPropagation();
        console.log("click time");
        if (menu.hasClass("active")) {
            menu.removeClass("active");
        } else {
            menu.addClass("active");
        }
    });

    menu.click(function () {
        event.stopPropagation();
    })

    statusUserImage.click(function () {

        if (statusMenu.hasClass("active")) {
            statusMenu.removeClass("active");
            showHome();
            showAppHistory();
        } else {
            statusMenu.addClass("active");
            hideHome();
            hideAppHistory();
        }
    });

    statusMenu.click(function () {
        event.stopPropagation();
    });

    signOutButton.click(function () {
        lockScreen.show();
        statusMenu.removeClass("active");
        showHome();
    });

    homeButton.click(function () {
        openedAppObj.close();
        showHome();
        showAppHistory();
    });

    function hideHome() {
        event.stopPropagation();
        home.css({ "top": "0px" });
        home.css({ "transform": "translateY(50%)" });
    }

    function showHome() {
        event.stopPropagation();
        home.css({ "top": "0px" });
        home.css({ "transform": "translateY(0px)" });
        hideNavBar();
    }

    function hideAppHistory() {
        appHistory.css({ "top": appHistoryslideHeight + "px" });
        appHistory.css({ "transform": "translateY(-50%)" });
    }

    function showAppHistory() {
        appHistory.css({ "top": appHistoryslideHeight + "px" });
        appHistory.css({ "transform": "translateY(0px)" });
    }

    function showNavBar() {
        navbar.show();
    }

    function hideNavBar() {
        navbar.hide();
    }

    card.click(function (e) {
        console.log("Click Card: ", e.currentTarget.id);
        var cardId = e.currentTarget.id;
        openedAppObj = new App(cardId);
    });

    appContainer.click(function (e) {
        console.log("Click Card: ", e.currentTarget.id);
        var cardId = e.currentTarget.id;
        openedAppObj = new App(cardId);
    });

    Number.prototype.roundTo = function (nTo) {
        nTo = nTo || 10;
        return Math.round(this * (1 / nTo)) * nTo;
    }

    console.log("Max", homeMax);
    home.draggable({
        axis: "y",
        scroll: false,
        position: 'unset',
        drag: function (event, ui) {
            if (ui.position.top < 0) {
                appHistory.css({ "transform": "translateY(" + ui.position.top + "px)" });
            }
            if (ui.position.top > homeMin) ui.position.top = homeMin;
            if (ui.position.top < homeMax) ui.position.top = homeMax;
        },
        stop: function (event, ui) {
            var topPositionRounded = (ui.position.top).roundTo(slideHeight);
            appHistory.css({ "transform": "translateY(" + topPositionRounded + "px)" });

            $(this).animate({
                'top': topPositionRounded
            });
        }
    });

    appHistory.draggable({
        axis: "y",
        scroll: false,
        position: 'unset',
        drag: function (event, ui) {
            if (ui.position.top > appHistoryslideHeight + 50) {
                home.css({ "opacity": 0 });
                statusBar.css({ "opacity": 0 });
            } else {
                home.css({ "opacity": 1 });
                statusBar.css({ "opacity": 1 });
            }
            if (ui.position.top > appHistoryMin) ui.position.top = appHistoryMin;
            if (ui.position.top < appHistoryMax) ui.position.top = appHistoryMax;
        },
        stop: function (event, ui) {
            if (ui.position.top < appHistoryslideHeight + 120) {
                home.css({ "opacity": 1 });
                statusBar.css({ "opacity": 1 });

                var topPositionRounded = (ui.position.top).roundTo(-appHistoryslideHeight);
                $(this).animate({
                    'top': topPositionRounded
                });
            }
        }

    });

    navigator.getBattery().then(function (battery) {
        function updateAllBatteryInfo() {
            updateChargeLevel();
            updateChargeInfo();
        }
        updateAllBatteryInfo();

        battery.addEventListener('chargingchange', function () {
            updateChargeLevel();
        });
        function updateChargeLevel() {
            batteryLevel.text(Math.round(battery.level * 100) + " %")
        }

        battery.addEventListener('chargingchange', function () {
            updateChargeInfo();
        });
        function updateChargeInfo() {
            batteryIcon.html(battery.charging ? "battery_charging_full" : "battery_full");
            console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));
        }

    });

    //Get User Location
    function codeLatLng(lat, lng) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results)
                var location = results[13].formatted_address;
                statusLocation.text("in " + location);
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }


    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude;
        var lng = crd.longitude;
        codeLatLng(lat, lng)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

    var appData = {
        "inbox": {
            "title": "Inbox",
            "color": "#4285f4",
            "content": "<h2>Content</h2>"
        },
        "recipes": {
            "title": "Recipes",
            "color": "#455A64",
            "content": "<h2>Content</h2>"
        },
        "maps": {
            "title": "Maps",
            "color": "#689df6",
            "content": "Content"
        },
        "app1": {
            "title": "App1",
            "color": "#3F51B5",
            "content": "<h2>Content</h2>"
        },
        "app2": {
            "title": "App2",
            "color": "#00695C",
            "content": "<h2>Content</h2>"
        },
        "app3": {
            "title": "App3",
            "color": "#827717",
            "content": "<h2>Content</h2>"
        }, "app4": {
            "title": "App4",
            "color": "#E65100",
            "content": "<h2>Content</h2>"
        },
        "app5": {
            "title": "App5",
            "color": "#1B5E20",
            "content": "<h2>Content</h2>"
        }
    }

    /*
    class OpenApps {
        constructor() {
            this.appList = {};
            this.numberOfApps = 0;
        }

        addApp(app) {
            if (app instanceof App) {
                this.appList[this.numberOfApps++] = {
                    "app": app,
                    "title": app.title
                };
            }
        }
        refreshList() {
            for (var i = 0; i < this.appList.length; i++) {
                if (i < 2) {
                    $(".big_cards").append('<div class="history_card"></div>' +
                        '<h6>App1</h6>');
                }
            }
        }
    }*/

    class App {
        constructor(id) {
            this.title = appData[id].title;
            this.color = appData[id].color;
            this.content = appData[id].content;
            this.open();
        }

        open() {
            console.log("Open App");
            hideHome();
            hideAppHistory();
            showNavBar();
            openedAppHeader.text(this.title);
            openedAppHeader.css({ "background": this.color });
            openedAppContent.html(this.content);
            openedApp.addClass("active");
        }
        close() {
            console.log("Close App");
            showHome();
            showAppHistory();
            hideNavBar();
            home.css({ "opacity": 1 });
            statusBar.css({ "opacity": 1 });
            openedApp.removeClass("active");
        }
    }

})



