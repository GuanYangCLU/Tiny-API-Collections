// Challenge: Think about optimizing and refactoring
// Cannot have two consistent routes
let input = [
    'HIVE/mr-compute-prod/default.abc',
    'HIVE/mr-compute-prod/defaultRM.abc',
    'HIVE/mr-storage-prod/default.accounts_quota_sl_join',
    'Hadoop/mr-storage-prod/default.al_account_groomer_status_secondary'
];

// Process the input
const strToArray = input => {
    return input.map(str => str.split('/'));
}

let op1 = strToArray(input);
// console.log(op1);

class Node {
    constructor(path){
        this.path = path;
        this.name = path;
        this.children = [];
    }
}

// component level(bottom)
class LeafNode {
    constructor(path){
        this.path = path;
        this.component = path;
    }
}

// inputItem: [string], len = 3
// routes: [Node]
// level: [eachLevelPath], len = 3
// curLv: 0, 1, 2
// newFlag: if parents level dif, then children can be same
const MAX_LEVEL = 2;

const storeNode = (inputItem, routes, level, curLv, newFlag) => {
    // if (!routes) routes = [];
    if (curLv === MAX_LEVEL) {
        let node = new LeafNode(inputItem[curLv]);        
        const idx = level[curLv].indexOf(inputItem[curLv]);        
        if (idx === -1) {
            // no this path found in this level
            routes.push(node);
            level[curLv].push(inputItem[curLv]);
        }
        newFlag = false;
        return;
    } else {
        let node = new Node(inputItem[curLv]);
        const idx = level[curLv].indexOf(inputItem[curLv]);
        if (idx === -1 || newFlag) {
            // no this path found in this level
            routes.push(node);
            level[curLv].push(inputItem[curLv]);
            newFlag = true;
            storeNode(inputItem, node.children, level, curLv+1, newFlag);
        } else {
            const existNode = routes.filter(node => node.path === inputItem[curLv])[0];
            storeNode(inputItem, existNode.children, level, curLv+1, newFlag);
        }
    }    
}

// final output: rts
let rts = [];
let lvl = [];
for (let i=0;i<3;i++) {
    lvl.push([]);
}
// level = lvl, inputIterm = op1[i]
for (let i=0;i<op1.length;i++) {
    storeNode(op1[i],rts,lvl,0,false); 
}

console.log('rs: ');

console.log(rts);
console.log(rts[0].children);
console.log(rts[1].children);
console.log(rts[0].children[0].children);
console.log(rts[0].children[1].children);
console.log(rts[1].children[0].children);
