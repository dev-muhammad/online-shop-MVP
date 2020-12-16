export default {
    add (state,  value) {
      state.list.unshift(value)
    },
    
    remove (state, index){
        state.list.splice(index,1)
    },

    update (state, param){
      state.list[param[0]] = param[1]
    },

    clear (state) {
        state.list = []
    }
  }
  