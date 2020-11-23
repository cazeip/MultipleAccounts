// ==UserScript==
// @name         Discord classes parser
// @version      0.1
// @description  A parser for discord's obfuscated classes.
// @author       Cazeip
// @match        https://discord.com/*
// ==/UserScript==

(function() {
    let importantThings = [];  
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
        ["button","lookFilled","colorBrand","spinnerItem","lookInverted","lookOutlined","lookGhost","lookLink","contents","hoverBrand","hasHover","colorGrey","hoverGrey","colorRed","hoverRed","colorGreen","hoverGreen","colorYellow","hoverYellow","colorLink","hoverLink","colorWhite","hoverWhite","colorBlack","hoverBlack","colorPrimary","hoverPrimary","colorTransparent","hoverTransparent","lookBlank","sizeSmall","sizeMedium","sizeLarge","sizeXlarge","sizeMin","sizeMax","sizeIcon","grow","fullWidth","submitting","spinner","disabledButtonWrapper","disabledButtonOverlay"],
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
                        importantThings[j] = key;
                    }
                }
            }
        }
    }
    console.log(importantThings);
    function eqSet(as, bs) {
        if (as.size !== bs.size) return false;
        for (var a of as) if (!bs.has(a)) return false;
        return true;
    }
})();