export const actions = {
    get({commit, dispatch}, path) {
      return this.$axios.get(path)
    },
    post({commit, dispatch}, data) {
        return this.$axios.post(data.path, data = data.data)
    }
  };