type AbilityFunction = () => void;

type Abilities = { [key: string]: AbilityFunction; };
type Textbooks = { [key: string]: string; };

const abilities : Abilities = {};

const queue: string[] = [];

const textbooks: Textbooks = {};

const learning: { [key: string]: boolean } = {};

function doWeKnow (abilityName: string) : boolean {
    return typeof abilities[abilityName] !== 'undefined';
};

const We = {
    can: function (abilityName: string, func: AbilityFunction) {
        abilities[abilityName] = func;
        delete learning[abilityName];

        // Do things if we just gained ability to do them
        We.do();
    },
    // not needed externally
    will: function (abilityName: string) {
        queue.push(abilityName);

        if (! doWeKnow(abilityName)) {
            We.learn(abilityName);
        }
    },
    should: function (abilityName: string) {
        if (doWeKnow(abilityName)) {
            abilities[abilityName]();
        } else {
            We.will(abilityName);
        }
    },
    // not needed externally
    learn: function (abilityName : string ) {
        if (!learning[abilityName] && typeof textbooks[abilityName] !== 'undefined') {
            learning[abilityName] = true;
            We.util.loadScript(textbooks[abilityName], () => {
                if (!doWeKnow(abilityName)) {
                    console.warn(`Script ${textbooks[abilityName]} failed to teach us ${abilityName}!`);
                }
            });
        }
    },
    // not needed externally
    do: function () {
        // Process items in the queue oldest to newest, stopping
        // at the first ability we can't do yet
        while (queue.length && doWeKnow(queue[0])) {
            abilities[queue.shift()]();
        }
    },
    canLearnTo: function (abilityName: string, url: string) {
        textbooks[abilityName] = url;
    },
    util: {
        loadScript: function (url: string, callback?: () => void) {
            const newScript = document.createElement("script");
            newScript.onerror = (e) => { throw new Error(`Could not load ${url}. ${e}`) };
            if (callback) newScript.onload = callback;
            newScript.src = url;
            document.head.appendChild(newScript);
        }
    }
};

export default We;