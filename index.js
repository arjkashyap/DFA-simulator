
/* 
states{
    id,
    connectedNodes[],
    selected
}
*/
let states = []

$(document).ready(function(){

    // Button functions
    // Add Node on button click
    
    $('#add-state').click(function(){
        
        // Generate a node Id 
        const nodeId = getNodeId()
        $('.draw-area').append(`<div id='q${nodeId}' class='node'> <p> Q${nodeId} </p>  </div>`);
        $(".node").draggable();
        states.push({ id: nodeId, connectedNodes: [], selected: false });

    });

    // Delete node function
    $('#del-state').click(function(){
        states.forEach( n => {
            if(n.selected){
                $(`#q${n.id}`).remove();
                states.splice(n.id, 1);
            }
        } )
    })

    // Connect state button function
    $('#connect-state').click( function(){
        console.log('connect called')
        let a = $('#q0')
        let b = $('#q1')
        //$('.vertices').appendchild  (`<path   d="M ${a.left.toFixed(2)} ${a.top.toFixed(2)} C 28 87 81 0 ${b.left.toFixed(2)} ${b.top.toFixed(2)}" fill="none" stroke="#456"/>`)
        drawCurvedLine('q0', 'q1');
    } );

    // Functions if the node is selected
    function nodeCheckClick(){
         states.forEach( n =>{
             $(`#q${n.id}`).mousedown( () => {
                n.selected = true; 
                disSelectAll(n);
               });
         });
     }
    setInterval(nodeCheckClick, 200);


    // Diselect other nodes if one is selected
    function disSelectAll(selectedNode = 0){
        states.forEach( n => {
            if(n.id != selectedNode.id)
                n.selected = false;
        })
    }

   // $('.draw-area').mousedown(() => )

    // Check select state
    setInterval(() => {
        states.forEach( n => {
            let color = '#577ee8';
            if(n.selected)
                color = '#abeada';
            $(`#q${n.id}`).css('background-color', color);
        } )
    }, 200);

    function getNodeId(){
        let tmpId = states.length;
        // check if the id exists
        while(true){
            found = false;
            for(let i = 0; i < states.length; i++){
                if(states[i].id == tmpId){
                    found = true;
                    break;
                }
            }
            if(found)
                tmpId++;
            else
                return tmpId;
        }
    }

    // Functions for drawing vertices between two states
    // Circle at the end of the virtex to show
    function drawCircle(x, y, radius, color) {
        var svg = createSVG();
            var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        shape.setAttributeNS(null, "cx", x);
        shape.setAttributeNS(null, "cy", y);
        shape.setAttributeNS(null, "r",  radius);
        shape.setAttributeNS(null, "fill", color);
        svg.appendChild(shape);
    }

    function drawCurvedLine(id1, id2){
        console.log(id1, id2)
       $(`#${id1}`).connections({ to: `#${id2}` });
    }
})

