let states = []

$(document).ready(function(){

    // Add Node on button click
    $('#add-state').click(function(){
        const nodeId = states.length;
        $('.draw-area').append(`<div class='node'> <p> Q${nodeId} </p>  </div>`);
        $(".node").draggable();
        states.push({ id: nodeId, connectedNodes: [] });
    });
})

