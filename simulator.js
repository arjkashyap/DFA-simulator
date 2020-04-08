console.log('DFA Simulator')


// Node Features
let startX = 120;
let startY = 150
const radiusX = 30;
const radiusY = 50;


// Contains all nodes in diagram
let states = [
    {
        name: 'Qo',
        nodeIndex: 0,
        posX: startX,
        posY: startY + 150,
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

function dragNode(n){
    console.log('Node dragging in progress')
}

// Draw Diagram on canvas
function drawDiagram(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if(ctx){
 
        // Drawing each node on canvas
        states.forEach( node => {
            ctx.font = '28px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(node.name, node.posX -16, node.posY + 8);
            ctx.fillStyle = '#1f47ba';
            ctx.beginPath();
            ctx.ellipse(node.posX, node.posY, radiusX, radiusY, Math.PI / 2, 0, 2 * Math.PI);

            // If the Node is start node, make two eclipses
            if( node.nodeIndex == 0 )
                 ctx.ellipse(node.posX, node.posY, radiusX + 5, radiusY + 5, Math.PI / 2, 0, 2 * Math.PI);
            ctx.stroke();
        });

        // Mouse clicked event
        $( document ).mousedown( (e) => console.log( `Mouse Down at ${e.clientX}, ${e.clientY}`) )

    }
    else{
        const err = document.getElementById('canvas-err');
        err.textContent = "Your browser does not support canvas.."

    }
}

setInterval(drawDiagram, 200);
//drawDiagram();

