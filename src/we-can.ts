type AbilityFunction = () => void;

type Abilities = { [key: string]: AbilityFunction; };

const abilities : Abilities = {};

const queue : string[] = [];

const We = {
    can: function(abilityName : string, func : AbilityFunction) {
        abilities[abilityName] = func;

        // Do things if we just gained ability to do them
        We.do();
    },
    will: function (abilityName: string) {

            queue.push(abilityName);
        
    },
    should: function (abilityName: string) {
        if (abilities[abilityName]) {
            abilities[abilityName]();
        } else {
            We.will(abilityName);
        }
    },
    do: function () {
        // Process items in the queue oldest to newest, stopping
        // at the first ability we can't do yet
        while (queue.length && abilities[queue[0]]) {
            abilities[queue.shift()]();
        }
    },
    util: {
        loadScript: function (url: string, callback? : () => void) {
            const newScript = document.createElement("script");
            newScript.onerror = (e) => { throw new Error(`Could not load ${url}. ${e}`) };
            if (callback) newScript.onload = callback;
            newScript.src = url;
            document.head.appendChild(newScript);
        }
    }
};

export default We;