console.log('DFA Simulator')

// Starting co-ordinates of a
let startX = 200;
let startY = 180;

// Contains all nodes in diagram

let states = [
    {
        name: 'Qo',
        nodeIndex: 0,
        posX: startX + 50,
        posY: startY,
        cNodes: []              // Connected Nodes
    }
]

// Add new node in the diagram
// Called when button pressed
function addNode(){
    const nodeNum = states.length;
    let newNode = {
        name: `Q${nodeNum}`,
        nodeIndex: nodeNum,
        posX: startX,
        posY: startY,
        cNodes: []
    };

    states.push(newNode);
}
