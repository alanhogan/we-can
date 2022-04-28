"use strict";
exports.__esModule = true;
var abilities = {};
var queue = [];
var We = {
    can: function (abilityName, func) {
        abilities[abilityName] = func;
        // Do things if we just gained ability to do them
        We["do"]();
    },
    will: function (abilityName) {
        queue.push(abilityName);
    },
    should: function (abilityName) {
        if (abilities[abilityName]) {
            abilities[abilityName]();
        }
        else {
            We.will(abilityName);
        }
    },
    "do": function () {
        // Process items in the queue oldest to newest, stopping
        // at the first ability we can't do yet
        while (queue.length && abilities[queue[0]]) {
            abilities[queue.shift()]();
        }
    },
    util: {
        loadScript: function (url, callback) {
            var newScript = document.createElement("script");
            newScript.onerror = function (e) { throw new Error("Could not load ".concat(url, ". ").concat(e)); };
            if (callback)
                newScript.onload = callback;
            newScript.src = url;
            document.head.appendChild(newScript);
        }
    }
};
exports["default"] = We;
