// ==UserScript==
// @name         Discord user login
// @namespace    http://cazeip.github.io/
// @version      1.6
// @description  Login into multiple accounts with Discord!
// @author       Cazeip
// @match        https://discord.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const v = "1.6";
    const apiPrefix = "https://discord.com/api/v8";
    let neededClasses = [];  
    let functionKeeper = webpackJsonp[0][1];
        
    let classesContain = [
        ["menu","scroller","styleFixed","styleFlexible","item","hideInteraction","customItem","labelContainer","label","subtext","iconContainer","icon","hintContainer","imageContainer","caret","image","disabled","separator","submenuContainer","submenuPaddingContainer","submenu","colorDefault","checkbox","radioSelection","check","focused","colorBrand","colorDanger","colorPremium","groupLabel"],
        ["statusItem","status","icon","description","customStatusItem","customStatusWithEmoji","customEmoji","customEmojiPlaceholder","customText","clearStatusButton","clearStatusIcon"],
        ["layerContainer","layer","layerHidden","disabledPointerEvents"],
        ["backdrop","backdropWithLayer"],
        ["backdrop","layer"],
        ["responsiveWidthMobile","innerPadding","focusLock","root","small","medium","large","fullscreenOnMobile","footer","header","separator","content","close","hideOnFullscreen"],
        ["artHeight","emojiSize","emojiMargin","formGroup","modalRoot","inputContainer","modalCloseButton","headerText","emojiButton","fullOpacity","emojiButtonContainer","emoji","input","clearButton","clearIcon","headerContainer","header","art","cancelButton"],
        ["_flex","_horizontal","_horizontalReverse","flex","horizontal","horizontalReverse","flexChild","flexMarginReset"],
        ["flex","alignStart","alignEnd","alignCenter","alignStretch","alignBaseline","justifyStart","justifyEnd","justifyCenter","justifyAround","justifyBetween","noWrap","wrap","wrapReverse","directionRow","directionRowReverse","directionColumn","spacer","vertical","horizontal","horizontalReverse","flexCenter"],
        ["button","lookFilled","colorBrand","spinnerItem","lookInverted","lookOutlined","lookGhost","lookLink","contents","hoverBrand","hasHover","colorGrey","hoverGrey","colorRed","hoverRed","colorGreen","hoverGreen","colorYellow","hoverYellow","colorLink","hoverLink","colorWhite","hoverWhite","colorBlack","hoverBlack","colorPrimary","hoverPrimary","colorTransparent","hoverTransparent","lookBlank","sizeTiny","sizeSmall","sizeMedium","sizeLarge","sizeXlarge","sizeMin","sizeMax","sizeIcon","grow","fullWidth","submitting","spinner","disabledButtonWrapper","disabledButtonOverlay"],
        ["scrollerBase","thin","fade","scrolling","auto","none","content","disableScrollAnchor"],
        ["container","downloadProgressCircle","guilds","base","sidebar","hasNotice","panels","content","activityPanel","hiddenOnMobileStore"],
        ["notice","colorDefault","button","colorNeutral","colorDownload","colorNotification","colorDark","colorPremium","colorPremiumTier1","colorPremiumTier2","colorInfo","colorSuccess","colorDanger","colorStreamerMode","colorSpotify","platformIcon","colorBrand","colorCustom","closeButton","buttonMinor"],
    ];
    let ccSet = [];
    for (let i = 0; i < classesContain.length; i++) {
        const element = classesContain[i];
        ccSet.push(new Set(element));
    }
    for (const key in functionKeeper) {
        if (functionKeeper.hasOwnProperty(key)) {
            const element = functionKeeper[key];
            let ans = {};
            element(ans);
            ans = ans.exports;
            if(ans != undefined || ans != null){
                ans = Object.keys(ans);
                let a = new Set(ans);
                for (let j = 0; j < ccSet.length; j++) {
                    const element2 = ccSet[j];
                    if(eqSet(element2, a)){
                        neededClasses[j] = key;
                    }
                }
            }
        }
    }
    function eqSet(as, bs) {
        if (as.size !== bs.size) return false;
        for (var a of as) if (!bs.has(a)) return false;
        return true;
    }
    let allClasses = {};
    const createElm = (html) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.removeChild(temp.firstElementChild);
        //webpackJsonp[0][1][neededClasses[0]].toString(); is the way
    }
    const insertCss = (css) => {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        return style;
    }
    insertCss(`.customAccount {background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0I5QkJCRSIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNiAxMWMxLjY2IDAgMi45OS0xLjM0IDIuOTktM1MxNy42NiA1IDE2IDVjLTEuNjYgMC0zIDEuMzQtMyAzczEuMzQgMyAzIDN6bS04IDBjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNTOS42NiA1IDggNUM2LjM0IDUgNSA2LjM0IDUgOHMxLjM0IDMgMyAzem0wIDJjLTIuMzMgMC03IDEuMTctNyAzLjVWMTloMTR2LTIuNWMwLTIuMzMtNC42Ny0zLjUtNy0zLjV6bTggMGMtLjI5IDAtLjYyLjAyLS45Ny4wNSAxLjE2Ljg0IDEuOTcgMS45NyAxLjk3IDMuNDVWMTloNnYtMi41YzAtMi4zMy00LjY3LTMuNS03LTMuNXoiLz48L3N2Zz4=);background-size: contain;background-repeat: no-repeat;}
               .changeAccount {grid-area: icon;margin-left: -2px;width: 16px;height: 16px;}
               .accountChooserContainer {display: flex;height: 70px;}
               .accountChooserAvatar {border-radius: 50%; align-self: center;height: 80%;}
               .accountName {align-self: center;font-size: x-large;font-weight: 400;color: var(--interactive-active);}
               .accountLogin {margin-left: auto;align-self: center;padding: 8px 20px;background-color: #43b581;font-weight: 900;color: #fff;border-radius: 5px;}
               .accountLogin:hover {background-color: #3ca374;}
               .accountDiscriminator{align-self: center;margin-top: 7px;color: var(--header-secondary);}
               #addAccount{margin-left: auto;margin: 10px auto;color: var(--header-secondary);cursor: pointer;}
               #addAccount:hover{text-decoration: underline;}
               .versionNotifier {background-color: #6b1ba7;}
               #changeLogButtonClick:hover {color: #6b1ba7;}
        `);
    function parseAllClasses(){
        for (var i = 0; i < neededClasses.length; i++) {
            let x = {};
            webpackJsonp[0][1][neededClasses[i]](x);
            allClasses[neededClasses[i]] = x.exports;
        }
        console.log(allClasses);
    }
    window.onclick = () => {
        let cont = document.getElementsByClassName(allClasses[neededClasses[0]].scroller);
        if(cont.length > 0 && !document.getElementById("status-picker-account")){
            cont[0].appendChild(createElm(`<div role="separator" class="${allClasses[neededClasses[0]].separator}"></div>`));
            let elmnt = createElm(`<div class="${allClasses[neededClasses[0]].item} ${allClasses[neededClasses[0]].colorDefault}" aria-disabled="false" role="menuitem" id="status-picker-account" tabindex="-1"><div class="${allClasses[neededClasses[1]].statusItem}" aria-label="Set a custom status"><div class="changeAccount customAccount"></div><div class="${allClasses[neededClasses[1]].status}">Change account</div></div></div>`);
            elmnt.onmouseover = () => {
                let allElmnts = document.getElementsByClassName(allClasses[neededClasses[0]].item);
                for (var i = 0; i < allElmnts.length; i++) {
                    allElmnts[i].classList.remove(allClasses[neededClasses[0]].focused);
                }
                elmnt.classList.add(allClasses[neededClasses[0]].focused);
            }
            elmnt.onmouseleave = () => {
                let allElmnts = document.getElementsByClassName(allClasses[neededClasses[0]].item);
                for (var i = 0; i < allElmnts.length; i++) {
                    allElmnts[i].classList.remove(allClasses[neededClasses[0]].focused);
                }
            }
            elmnt.onclick = openPicker;
            cont[0].appendChild(elmnt);
        }
        if(localStorage.versionMA != v && !document.getElementsByClassName("versionNotifier")[0]){
            let baseElement = document.getElementsByClassName(allClasses[neededClasses[11]].base);
            if(baseElement[0]){
                baseElement[0].prepend(createElm(`<div class="${allClasses[neededClasses[12]].notice} ${allClasses[neededClasses[12]].colorDefault} versionNotifier"><div class="${allClasses[neededClasses[12]].closeButton}" id="versionNotifierCloseButton" aria-label="Dismiss" role="button" tabindex="0"></div>Multiple Discord Accounts ${v} makes corners rounder!<button id="changeLogButtonClick" class="${allClasses[neededClasses[12]].button}">View changes</button></div>`));
                document.getElementById("changeLogButtonClick").onclick = () => {
                    window.open("https://github.com/cazeip/MultipleAccounts/blob/master/changes.md");
                    document.getElementsByClassName("versionNotifier")[0].remove();
                    localStorage.versionMA = v;
                }
                document.getElementById("versionNotifierCloseButton").onclick = () => {
                    document.getElementsByClassName("versionNotifier")[0].remove();
                    localStorage.versionMA = v;
                }
            }
        }
    }
    function getUserInfo(){
        window.dispatchEvent(new Event('beforeunload'));
        let currentToken = JSON.parse(localStorage.getItem("token"));
        return fetch(apiPrefix + "/users/@me", {
            headers: {
                Accept: "*/*",
                "Accept-Language": "en-US",
                Authority: "discordapp.com",
                Authorization: currentToken,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.301 Chrome/56.0.2924.87 Discord/1.6.15 Safari/537.36",
            },
            method: "GET",
        }).then((res) => (res.status === 200 ? res.json() : Promise.resolve()))
          .catch(console.error);
    }
    function getUser(userID){
        window.dispatchEvent(new Event('beforeunload'));
        let currentToken = JSON.parse(localStorage.getItem("token"));
        return fetch(apiPrefix + "/users/"+userID, {
            headers: {
                Accept: "*/*",
                "Accept-Language": "en-US",
                Authority: "discordapp.com",
                Authorization: currentToken,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.301 Chrome/56.0.2924.87 Discord/1.6.15 Safari/537.36",
            },
            method: "GET",
        }).then((res) => (res.status === 200 ? res.json() : Promise.resolve()))
          .catch(console.error);
    }
    async function fillLocalStorage(){
        let info = await getUserInfo();
        window.dispatchEvent(new Event('beforeunload'));
        info.token = JSON.parse(localStorage.getItem("token"));
        localStorage.setItem("multipleAccounts", JSON.stringify([{id:info.id, token: info.token}]));
    }
    function apiCall(apiPath, body, method = "GET"){
        window.dispatchEvent(new Event('beforeunload'));
        let currentToken = JSON.parse(localStorage.getItem("token"));
        return fetch(apiPrefix + apiPath, {
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                Accept: "*/*",
                "Accept-Language": "en-US",
                Authority: "discordapp.com",
                Authorization: currentToken,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.301 Chrome/56.0.2924.87 Discord/1.6.15 Safari/537.36",
            },
            method,
        }).then((res) => (res.status === 200 ? res.json() : Promise.resolve()))
          .catch(console.error);
    }
    function changeAccount(newToken){
        window.dispatchEvent(new Event('beforeunload'));
        let token = JSON.parse(localStorage.token);
        apiCall("/auth/logout", {"provider":null,"voip_provider":null}, "POST");
        window.location.href = "http://discord.com/login";
        localStorage.token = "\""+newToken+"\"";
        if (newToken == "--[LogIn]--") {
            localStorage.removeItem("token");
        }
    }
    async function openPicker(){
        if(localStorage.getItem("multipleAccounts") == null || localStorage.getItem("multipleAccounts") == undefined){
            await fillLocalStorage();
        }else{
            let info = await getUserInfo();
            let localSt = JSON.parse(localStorage.getItem("multipleAccounts"));
            let def = false;
            for (let i = 0; i < localSt.length; i++) {
                if(localSt[i].id === info.id){
                    def = true;
                }
            }
            if(!def){
                localSt.push({id: info.id, token: JSON.parse(localStorage.getItem("token"))});
            }
            localStorage.setItem("multipleAccounts", JSON.stringify(localSt));
        }
        let info = JSON.parse(localStorage.getItem("multipleAccounts"));
        if(document.getElementById("accountPickerModal")) return;
        let a = document.getElementsByClassName(allClasses[neededClasses[2]].layerContainer);
        let y = createElm(`<div id="accountPickerBg" class="${allClasses[neededClasses[3]].backdropWithLayer}" style="opacity: 0; background-color: rgb(0, 0, 0); transform: translateZ(0px);transition: opacity 0.2s;"></div>`);
        y.onclick = closePicker;
        a[a.length - 1].appendChild(y);
        let x = createElm(`<div class="${allClasses[neededClasses[4]].layer}" id="accountPickerModal"> <div class="${allClasses[neededClasses[5]].focusLock}" role="dialog" aria-label="Set a custom status" tabindex="-1" aria-modal="true"> <div class="${allClasses[neededClasses[6]].modalRoot} ${allClasses[neededClasses[5]].root} ${allClasses[neededClasses[5]].small} ${allClasses[neededClasses[5]].fullscreenOnMobile}" id="animatedModal" style="opacity: 0;transform: scale(0.2);transition: transform .2s, opacity .2s;"> <div class="${allClasses[neededClasses[7]].flex} ${allClasses[neededClasses[7]]._horizontal} ${allClasses[neededClasses[8]].justifyStart} ${allClasses[neededClasses[8]].alignCenter} ${allClasses[neededClasses[8]].noWrap} ${allClasses[neededClasses[5]].header} ${allClasses[neededClasses[6]].headerContainer}" id="replaceBackground" style="flex: 0 0 auto;background-position: bottom;background-size: cover;background-image: url(https://cdn.discordapp.com/attachments/768475463524941865/768481090087944233/pawel-nolbert-4u2U8EO9OzY-unsplash.jpg);padding: 30px;"> <div class="${allClasses[neededClasses[6]].header}" style="padding-top: 0;"><h4 class="${allClasses[neededClasses[6]].headerText}">Choose a Discord account</h4></div><button id="closeXbutton" aria-label="Close" type="button" class="${allClasses[neededClasses[5]].close} ${allClasses[neededClasses[6]].modalCloseButton} ${allClasses[neededClasses[9]].button} ${allClasses[neededClasses[9]].lookBlank} ${allClasses[neededClasses[9]].colorBrand} ${allClasses[neededClasses[9]].grow}"> <div class="${allClasses[neededClasses[9]].contents}"> <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg> </div></button> </div><div id="accountLinesContainer" class="${allClasses[neededClasses[5]].content} ${allClasses[neededClasses[10]].thin}" dir="ltr" style="overflow: hidden scroll; padding-right: 8px; padding-top: 10px;"></div><span id="addAccount">Not seeing your account? Click here to add one.</span></div></div></div>`);
        a[a.length - 1].appendChild(x);
        document.getElementById("closeXbutton").onclick = closePicker;
        document.getElementsByClassName(allClasses[neededClasses[2]].layer)[0].style.display = "none";
        document.getElementById("addAccount").onclick = () => {
            changeAccount("--[LogIn]--");
        }
        setTimeout(async () => {
            document.getElementById("accountPickerBg").style.opacity = "0.85";
            document.getElementById("animatedModal").style.transform = "scale(1)";
            document.getElementById("animatedModal").style.opacity = "1";
            for (let i = 0; i < info.length; i++) {
                let line;
                let user = await getUser(info[i].id);
                if(user.avatar == null){
                    line = createElm(`<div class="accountChooserContainer"><img class="accountChooserAvatar" src="https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png"><div style="margin-left: 20px;align-self: center;display: flex;flex-direction: column;"><div><span class="accountName">${user.username}</span><span class="accountDiscriminator">#${user.discriminator}</span></div><span style="color: var(--text-muted);padding-top: 2px;padding-left: 0;">ID: ${user.id}</span></div><button id="AccountSwitchButton${i}" class="accountLogin">Log in</button></div>`);
                }else{
                    line = createElm(`<div class="accountChooserContainer"><img class="accountChooserAvatar" src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128"><div style="margin-left: 20px;align-self: center;display: flex;flex-direction: column;"><div><span class="accountName">${user.username}</span><span class="accountDiscriminator">#${user.discriminator}</span></div><span style="color: var(--text-muted);padding-top: 2px;padding-left: 0;">ID: ${user.id}</span></div><button id="AccountSwitchButton${i}" class="accountLogin">Log in</button></div>`);
                }
                document.getElementById("accountLinesContainer").appendChild(line);
                document.getElementById("AccountSwitchButton"+i).onclick = () => {
                    changeAccount(info[i].token);
                }
            }
        }, 100);
    }
    function closePicker(){
        document.getElementById("accountPickerBg").style.opacity = "0";
        document.getElementById("animatedModal").style.transform = "scale(0.2)";
        document.getElementById("animatedModal").style.opacity = "0";
        setTimeout( () => {
            document.getElementById("accountPickerBg").remove();
            document.getElementById("accountPickerModal").remove();
        }, 201);
    }
    window.localStorage = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
    parseAllClasses();
})();