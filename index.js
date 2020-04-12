
/* 
states{
    id,
    connectedNodes[],
    selected
}
*/
let states = []

$(document).ready(function(){

    console_msg('Press Add state button to Add a new node in the diagram');

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

    // Open state transition modal
    $('#connect-state').click( () => $('#connect-form').modal('show') );

    // Connect states with input
    $('#add-transition-btn').click( function(){
        const frm = $('#from-state').val();
        const input = $('#input').val();
        const to = $('#to-state').val();
        
        if(!(states.includes(frm)))
            console_msg(`State ${frm} not found.. Make Sure you Entered the right name`, 1)
        else if( !(states.includes(to)) )
            console_msg(`State ${to} not found.. Make Sure you Enterd the right name`, 1)

        $(`#${frm}`).connections({ to: `#${to}` });
        $('#connect-form').modal('hide');
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


    // Print Messaages in console
    function console_msg(msg, type=0){
        // type 0: Instruction
        // type 1 : Warning
        // type 2 : Error
        let color = "blue";
        if(type == 1)
            color = "#068671";
        const cons = document.getElementById('msg');
     
        cons.textContent = msg;
        cons.style.color = color
    }
})

