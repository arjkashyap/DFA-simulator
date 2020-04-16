
/* 
states{
    id,
    connectedNodes[],
    selected
    final
}
connectedNodes{
    input: input string,
    state: state name
}
*/

let states = [
    {
        id: 0,
        connectedNodes: [],
        seleced: false,
        final: false
    }
]

$(document).ready(function(){

    console_msg('Press Add state button to Add a new node in the diagram and drag the node to custom positions');
    $('#q0').draggable({containment: ".draw-area"});

    // Button functions
    // Add Node on button click
    $('#add-state').click(function(){
        console_msg('Inputs and transitions can be defined through state transition button')
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

        // check if final state is defined
        let finalStatePresent = false;
        states.forEach( n => {
            if(n.final == true)
                finalStatePresent = true;
        } )
        
        if(finalStatePresent)        
            $('#test-form').modal('show');
        else
            console_msg('No Final State Specified in the Diagram. Select a state and press Make Final State', 2);
    })

    // Open state transition modal
    $('#connect-state').click( () => $('#connect-form').modal('show') );

    // Run siimulation listener
    $('#run-btn').click( () => {
        // reset validation
        document.getElementById('input-str-validator').textContent = '';
        const inputStr = $('#input-str').val();
        if(inputStr == '')
            document.getElementById('input-str-validator').textContent = 'Test string cannot be empty';
        else{
            $('#test-form').modal('hide')
            runSimulation(inputStr);
        }
        
    });

    // Connect states to a node on specified input
    $('#add-transition-btn').click( function(){
        let frm = $('#from-state').val();
        let input = $('#state-input').val();
        let to = $('#to-state').val();
        frm = frm.toLowerCase();
        to = to.toLowerCase();

        if( transitionValidated(frm, input, to) ){
            // Connect states
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
                input: input,
                state: to[1]
            })
            // Print message on console
            console_msg(`State Transition specified from ${frm} to ${to} for input ${input}`, 1)
        } 

        
    } );

    // Validation for state transition form
    function transitionValidated(from, input, to){
        document.getElementById('frm-validate').textContent = ``;
        document.getElementById('input-validate').textContent = ``;
        document.getElementById('to-validate').textContent = ``;
        
        let fromStatePresent = false, toStatePresent = false, inputPresent = false;
        const f = from[1];
        const i = input;
        const t = to[1];
        
        states.forEach( n => {
            if(n.id == f){
                fromStatePresent = true;
                if( (n.connectedNodes.filter( c => c.input === i).length ) )
                    inputPresent = true;
            }
            if(n.id == t){
                toStatePresent = true;
            }
        })

        if(!fromStatePresent)
            document.getElementById('frm-validate').textContent = `State ${from} is not present in diagram. Enter a valid state name`;
        
        if(inputPresent)
            document.getElementById('input-validate').textContent = `Specified input ${input} is already defined in the state ${from}`;
        if(input == '')
            document.getElementById('input-validate').textContent = `Input cannot be empty filed`;
            

        if(!toStatePresent)
            document.getElementById('to-validate').textContent = `State ${to} is not present in diagram. Enter a valid state name`;

        if(fromStatePresent && toStatePresent && !(inputPresent) && input !='')
            return true;
        
        return false
    }

    // Function makes the seleced state as final state
    $('#final-btn').click(function(){
        let finalStateId = null;
        states.forEach(n => {
            if(n.selected){
                n.final = true;
                finalStateId = n.id;
            }      
        })
        const state = document.getElementById(`q${finalStateId}`);
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
        document.getElementById('test-string-disp').textContent = inputStr;
        // Pointer startes at node zero
        let statePtr = states[0].id;
        let currentState = states[statePtr];
        let inputPtr = 0;               // Points to the index in input string
        let input = null;
        while(inputPtr < inputStr.length){
            let nextStateIndex = null;
            input = inputStr[inputPtr];

            // Find the state transition corrosponding to input
            currentState.connectedNodes.forEach( n => {
                if(n.input == input){
                    nextStateIndex =  n.state;
                    return;
                }
            } );
            
            // Check if state responds to an input or not
            if( nextStateIndex == null ){
                console.log(`Terminated termnated at state ${currentState} for input ${input}`);
                break;
            }

            console.log('next state Index')
            currentState = states[nextStateIndex];            
            inputPtr++;
        }

        console.log('sim over..');
        console.log('current state: ')
        console.log(currentState);
        if(currentState.final){
            console.log('Test Passed ....');
            console_msg(`Input String <span style="color: green"> ACCEPTED </span>, input ended at state q${currentState.id}` , 1);
        }
        else{
            console_msg('Input string <span style="color: red">REJECTED</span> by DFA.', 1);
        }
        
    }

    // Print Messaages in console
    function console_msg(msg, type=0){
        // type 0: Instruction
        // type 1 : Info
        // type 2 : Error
        let color = "blue";
        if(type == 1)
            color = "#068671";
        else if(type == 2)
            color = "red"
        const cons = document.getElementById('msg');
     
        cons.innerHTML = msg;
        cons.style.color = color
    }
})

