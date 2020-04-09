
/* 
{
    id,
    connectedNodes[],
    selected
}
*/
let states = []

$(document).ready(function(){

    // Add Node on button click
    $('#add-state').click(function(){
        const nodeId = states.length;
        $('.draw-area').append(`<div id='q${nodeId}' class='node'> <p> Q${nodeId} </p>  </div>`);
        $(".node").draggable();
        states.push({ id: nodeId, connectedNodes: [], selected: false });
    });


    // Functions if the node is selected
    function nodeCheckClick(){
         states.forEach( n =>{
             //console.log(`node: q${n.id}`)
             $(`#q${n.id}`).mousedown( () => console.log(`Clicked..q${n.id}`) );
         });
     }
    
   setInterval(nodeCheckClick, 200);
})

