class Calculator {
    constructor(previousoperandtextelement, currentoperandtextelement) {
        this.previousoperandtextelement = previousoperandtextelement
        this.currentoperandtextelement = currentoperandtextelement
        this.clear()
    }

    clear() {
         this.currentoperand = ''
         this.previousoperand = ''
         this.operation = undefined
    }

    del() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    appendnumber(number) {
        if(number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()
    }

    chooseoperation(operation) {
        if(this.currentoperand === '') return 
        if (this.previousoperand !== '') {
            this.compute()
        }
          this.operation = operation
          this.previousoperand = this.currentoperand
          this.currentoperand = ''
    }

    compute(){
      let computation
      const prev = parseFloat(this.previousoperand)
      const current = parseFloat(this.currentoperand)
      if (isNaN(prev) || isNaN(current)) return
      switch(this.operation) {
          case '+':
              computation = prev + current
              break
          case '-':
              computation = prev - current
              break
          case '*':
              computation = prev * current
              break
          case '/':
              computation = prev / current
              break 
              default:
              return
            }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }

    getdisplaynumber(number) {
        const stringnumber = number.toString()
        const integernumber = parseFloat(stringnumber.split('.')[0])
        const decimalnumber = stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integernumber)) {
            integerdisplay = ''
        } else {
            integerdisplay = integernumber.toLocaleString('en', {
                maximumFractionDigits: 0  })
        }
        if (decimalnumber != null) {
            return `${integerdisplay}.${decimalnumber}`
        } else {
            return integerdisplay
        }
    }

    updatedisplay() {
           this.currentoperandtextelement.innerText = this.getdisplaynumber(this.currentoperand)
           if (this.operation != null) {
               this.previousoperandtextelement.innerText = `${this.getdisplaynumber(this.previousoperand)} ${this.operation}`
           } else {
               this.previousoperandtextelement.innerText = ''
           }
        }
}


const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalsbutton = document.querySelector('[data-equals]')
const delbutton = document.querySelector('[data-del]')
const acbutton = document.querySelector('[data-ac]')
const previousoperandtextelement = document.querySelector('[data-previous-operand]')
const currentoperandtextelement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousoperandtextelement, currentoperandtextelement)

numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
  })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})

equalsbutton.addEventListener('click', button => {
    calculator.compute()
    calculator.updatedisplay()
})

acbutton.addEventListener('click', button => {
       calculator.clear()
       calculator.updatedisplay()
})

delbutton.addEventListener('click', button => {
    calculator.del()
    calculator.updatedisplay()
})