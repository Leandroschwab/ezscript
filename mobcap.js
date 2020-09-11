/*
This script was made by Leandro Schwab
https://github.com/Leandroschwab/
*/


const system = server.registerSystem(0, 0);

var hora_mob = Date.now();
var mobnumber = 0;
var mobmutex = true
var moblist = [
    //mobspassivos que podem ser farmados
    { mobtype: "bee", mobcap: 30 },
	{ mobtype: "pig", mobcap: 30 },
    { mobtype: "cat", mobcap: 40 },
    { mobtype: "chicken", mobcap: 30 },
    { mobtype: "cow", mobcap: 30 },
    { mobtype: "donkey", mobcap: 20 },
    { mobtype: "horse", mobcap: 30 },
    { mobtype: "llama", mobcap: 20 },
    { mobtype: "mooshroom", mobcap: 20 },
    { mobtype: "mule", mobcap: 20 },
    { mobtype: "Panda", mobcap: 20 },
    { mobtype: "parrot", mobcap: 20 },
    { mobtype: "rabbit", mobcap: 20 },
    { mobtype: "sheep", mobcap: 30 },
    { mobtype: "snow_golem", mobcap: 20 },
    { mobtype: "turtle", mobcap: 20 },
    { mobtype: "villager", mobcap: 120 },
    { mobtype: "wolf", mobcap: 40 },
    { mobtype: "iron_golem", mobcap: 20 },
    { mobtype: "strider", mobcap: 20 },
    { mobtype: "xp_orb", mobcap: 45 },
    //mobs não passivos 
    { mobtype: "zombie", mobcap: 100 },
    { mobtype: "skeleton", mobcap: 100 },
    { mobtype: "spider", mobcap: 50 },
    { mobtype: "cave_spider", mobcap: 50 },
    { mobtype: "silverfish", mobcap: 50 },
    { mobtype: "blaze", mobcap: 50 },
    { mobtype: "magma_cube", mobcap: 50 },
    { mobtype: "zombie_pigman", mobcap: 70 }
];

system.initialize = function () {
    //register event data, register components, register queries, listen for events
    console.log("timestop initialize");
    console.log("timestop initialize end");
};

system.update = function () {
    //Update all the things
    if ((hora_mob < Date.now() - 10000) && mobmutex) {
        //console.log("mobcap started");
        mobmutex = false;
        system.executeCommand("/testfor @e[type=" + moblist[mobnumber].mobtype + "]", (commandResultData) => this.commandCallback(commandResultData));
        hora_mob = Date.now();
    }
    //console.log("timestop update end");
};

system.commandCallback = function (commandResultData) {
    if (typeof commandResultData.data.victim !== 'undefined') {
        var mobs = commandResultData.data.victim.length;
        var mobcap = moblist[mobnumber].mobcap;
        if (mobs > mobcap) {
            //console.log("killing " + (mobs - mobcap) + " " + moblist[mobnumber].mobtype + " Atingiu o mobcap");
            system.executeCommand('/tellraw @a {"rawtext":[{"text":"§cMobcap Killing ' + (mobs - mobcap) + ' ' + moblist[mobnumber].mobtype + ' - Maximum Global: ' + mobcap + '"}]}', {});
            //system.executeCommand("/say §cMobcap Killing " + (mobs - mobcap) + " " + moblist[mobnumber].mobtype + " - Maximum Global: " + mobcap, {});
            system.executeCommand("/kill @r[type=" + moblist[mobnumber].mobtype + ",c=" + (mobs - mobcap) + "]", {});
            mobs--;
        }
    }
    mobmutex = true;
    mobnumber++;
    if (mobnumber >= moblist.length) {
        mobnumber = 0;
    }

};

console.log("mobcap Loaded ok");