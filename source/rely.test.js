describe('rely', () => {
  const rely = require('./rely')

  describe('the wrapped function', () => {
    context('when all dependencies are provided', () => {
      it('provides all arguments and dependencies to the original function', () => {
        const testFunction = stub().returns('OK')
        function supportFunction() {}

        const wrapped = rely.on('supportFunction').to(testFunction)
        const result = wrapped.provide({ supportFunction }).run(1, 2, 3)

        expect(testFunction).to.have.been.calledOnceWith(1, 2, 3, { supportFunction })
        expect(result).to.eq('OK')
      })
    })

    context('when not all dependencies are provided', () => {
      it('throws an error', () => {
        function testFunction() {}
        function supportFunctionOne() {}
        function supportFunctionTwo() {}

        const wrapped = rely.on('supportFunctionOne', 'supportFunctionTwo')
          .to(testFunction)

        let caught

        try {
          wrapped.provide()
        }

        catch (error) {
          caught = error
        }

        expect(caught).to.exist
        expect(caught.message)
          .to.include('testFunction')
          .to.include('supportFunctionOne')
          .and.to.include('supportFunctionTwo')
      })
    })

    context('when not all dependencies are defined', () => {
      it('throws an error', () => {
        function testFunction() {}
        function supportFunctionOne() {}

        const wrapped = rely.on('supportFunctionOne', 'supportFunctionTwo')
          .to(testFunction)

        let caught

        try {
          wrapped.provide({ supportFunctionOne, supportFunctionTwo: undefined })
        }

        catch (error) {
          caught = error
        }

        expect(caught).to.exist
        expect(caught.message).to.include('supportFunctionTwo')
      })
    })
  })
})
