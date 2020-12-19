export const actions = {
    get({commit, dispatch}, path) {
      return this.$axios.get(path)
    },
    post({commit, dispatch}, data) {
      this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      return this.$axios.post(data.path, data = data.data, {headers: {}})
    }
  };