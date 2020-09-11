/*
This script was made by Leandro Schwab
https://github.com/Leandroschwab/
*/


const system = server.registerSystem(0, 0);

var hora_remove = Date.now();
var itemlist = ["dirt", "cobblestone", "sand", "gravel", "granite", "diorite", "snowball", "end stone", "netherrack"];
var item = 0;
system.initialize = function () {
    //register event data, register components, register queries, listen for events
    console.log("removeitem initialize");
    console.log("removeitem initialize end");
};

system.update = function () {
    //Update all the things
    if ((hora_remove < Date.now() - 6000)) {
        //console.log("remove started");
        //system.executeCommand('/tellraw @a {"rawtext":[{"text":"§cremoveitens Killing ' + itemlist[item] + ' "}]}', {});
        system.executeCommand("/kill @e[type=item,name=" + itemlist[item] + "]", {});
        hora_remove = Date.now();
        item++;
        if (item >= itemlist.length) {
            item = 0;
        }
    }
    //console.log("timestop update end");
};


console.log("removeitem Loaded ok");