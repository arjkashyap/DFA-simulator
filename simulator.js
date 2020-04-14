
/* 
states{
    id,
    connectedNodes[],
    selected
    final
}
connectedNodes{
    input,
    node,
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
        let nodeText = `<div 
                id='q${nodeId}' class='node'> 
                    <p> Q${nodeId} </p> 
                    <p id="q${nodeId}-input-details" class="input-details"></p>  
                </div>`
       
        $('.draw-area').append(nodeText);
        $(".node").draggable({containment: ".draw-area"});
        states.push({ id: nodeId, connectedNodes: [], selected: false, final:false });

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

    // Simulate button listener
    $('#test-btn').click(() => {
  
        let div = divs.tstFormDiv
        let tstForm = document.getElementById('test-form');
        tstForm.innerHTML = div;
        $('#test-form').modal('show');
    })

    // Open state transition modal
    $('#connect-state').click( () => {
        let connectForm = document.getElementById('connect-form');
        connectForm.innerHTML = divs.connectForm;
        $('#connect-form').modal('show') 
    });

    // Run siimulation listener
    $('#run-btn').click( () => {
        const inputStr = $('#input-str').val();
        $('#test-form').modal('hide')
        runSimulation(inputStr);
    });

    // Connect states to a node on specified input
    $('#add-transition-btn').click( function(){
        let frm = $('#from-state').val();
        let input = $('#state-input').val();
        let to = $('#to-state').val();
        frm = frm.toLowerCase();
        to = to.toLowerCase();

        $(`#${frm}`).connections({ to: `#${to}` });
        $('#connect-form').modal('hide');
      
        // Set up connection details on the node
        let inputDetails = document.getElementById(`${frm}-input-details`);
   
        const nodeId = parseInt(frm[1]);
        let cNodes = states[nodeId].connectedNodes;

        if(cNodes.length == 0)
            inputDetails.textContent = `${input} -> ${to}`
        else if(cNodes.length > 0)
            inputDetails.textContent += ` | ${input} -> ${to}`
      
        cNodes.push({
            'input': input,
            'node': to
        })

        // Console print message
        if(states.filter(n => n.id == frm[1]))
            console_msg(`State ${frm} not found.. Make Sure you Entered the right name`, 1)
        else if(states.filter(n => n.id == to[1]) )
            console_msg(`State ${to} not found.. Make Sure you Enterd the right name`, 1)
        
        console.log(states)
       
    } );

    // Function makes the seleced state as final state
    $('#final-btn').click(function(){
        let finalStateId = null;
        states.forEach(n => {
            if(n.selected){
                n.final = true;
                finalStateId = n.id;
            }      
        })
        console.log('Final state: ' + finalStateId)
        const state = document.getElementById(`q${finalStateId}`);
        console.log(state.style)
        state.style.border = '#1f3c7d 12px solid'
    })

    // Functions if the node is selected
    function nodeCheckClick(){
        states.forEach( n =>{
            $(`#q${n.id}`).mousedown( () => {
            n.selected = true;
            
            disSelectAll(n);
            })
            .mouseup( () => {
                $(`#q${n.id}`).connections('update');
            })
        });

        if(states.length < 1)
            $('#final-btn').hide();
            
        let selected = states.some( n => n.selected == true );
        // Hide make final state button if no state is selected
        if(!selected)
            $('#final-btn').hide();
        else
            $('#final-btn').show();
 
     }
    setInterval(nodeCheckClick, 200);


    // Diselect other nodes if one is selected
    function disSelectAll(selectedNode = 0){
        states.forEach( n => {
            if(n.id != selectedNode.id)
                n.selected = false;
        })
    }


    // Check select state
    setInterval(() => {
        states.forEach( n => {
            let color = '#577ee8';
            if(n.selected)
                color = '#abeada';
            $(`#q${n.id}`).css('background-color', color);
        } )
    }, 200);

    // Generate New Node id
    function getNodeId(){
        let tmpId = states.length;
        console.log(tmpId)
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

    // Run Simulation for a given input str
    function runSimulation(inputStr){
        if( states.length == 0 ){
            console_msg('Draw A diagram to run simulator..', 1)
            return;
        }
        
        console_msg('Test Running. . .', 2);


    }

    // Print Messaages in console
    function console_msg(msg, type=0){
        // type 0: Instruction
        // type 1 : Warning
        // type 2 : Error
        let color = "blue";
        if(type == 1)
            color = "#068671";
        else if(type == 2)
            color = "green"
        const cons = document.getElementById('msg');
     
        cons.textContent = msg;
        cons.style.color = color
    }
})

