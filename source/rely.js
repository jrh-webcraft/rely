module.exports = {
  on(...required) {
    return {
      to: function(fn) {
        let provided = {}

        return {
          provide(dependencies = {}) {
            provided = dependencies

            const missing = required.filter(dependency => {
              return typeof(provided[dependency]) === 'undefined'
            })

            if (missing.length > 0) {
              const message = `[rely] ${ fn.name } was called with missing dependencies (${ missing.join(', ') }).`
              throw new Error(message)
            }

            return this
          },

          run() {
            return fn(...arguments, provided)
          }
        }
      }
    }
  }
}
