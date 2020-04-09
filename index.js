
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
})

