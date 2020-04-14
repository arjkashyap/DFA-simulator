// Module stores divs to be appended at specific divs


let divs = {
    connectForm: `
    <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add a State Transition</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label id ="from-state-lbl">From </label>
                  <input type="text" class="form-control form-control-sm" id="from-state" placeholder="Name of the state which takes the input">
                </div>

              <hr/>

              <div class="form-group">
                <label id ="from-state-lbl">Input </label>
                <input type="text" class="form-control form-control-sm" id="state-input" placeholder="State Input">
              </div>

              <hr/>

                <div class="form-group">
                  <label id ="to-state-lbl">To State </label>
                  <input type="text" class="form-control form-control-sm" id="to-state" placeholder="Name of the state where the transition takes">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" id="add-transition-btn" class="btn btn-primary">Connect states</button>
            </div>
          </div>
        </div>
    `,
    tstFormDiv: `
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Test Your DFA</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label id ="tst-str">Input String </label>
            <input type="text" class="form-control form-control-sm" id="input-str" placeholder="Enter the input string to test machine">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" id="run-btn" class="btn btn-success">Run Simulation</button>
      </div>
    </div>
  </div>
    `
}