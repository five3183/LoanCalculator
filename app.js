// UI variables
const amount = document.getElementById('amount')
const interest = document.getElementById('interest')
const years = document.getElementById('years')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')

const showError = error => {
   // Get elements from page
   const card = document.querySelector('.card')
   const heading = document.querySelector('.heading')

   const clearError = () => {
      document.querySelector('.alert').remove()
   }

   // If there is an error, check to see if the first div id is the error div. IF it is not added.  This is to prevent multiple error divs being added. 
   if(card.children[0].id != 'error-div'){
      const errorDiv = document.createElement('div')
      errorDiv.id = 'error-div'
      errorDiv.className = 'alert alert-danger'
      errorDiv.appendChild(document.createTextNode(error))
      //Insert error above heading using insertBefore.  This is called on a parent.  It takes 2 arguments, one is the element that is being inserted the other is where it is to be inserted before.
      card.insertBefore(errorDiv, heading)
      
      // clear error after 3 seconds or 3000 milisecods
      setTimeout(clearError, 3000)
   }
}

const calculateResults = e => {
   const principal = parseFloat(amount.value)
   const calculatedInterest = parseFloat(interest.value) / 100 / 12
   const calculatedPayments = parseFloat(years.value) * 12


   //Compute monthly payments
   const x = Math.pow(1 + calculatedInterest, calculatedPayments)
   const monthly = (principal * x * calculatedInterest) / (x-1)

   // check to see if value is a finite number.
   if(isFinite(monthly)){
      monthlyPayment.value = monthly.toFixed(2)
      totalPayment.value = (monthly * calculatedPayments).toFixed(2)
      totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2)

      document.getElementById('loading').style.display = 'none'
      document.getElementById('results').style.display = 'block'
      document.getElementById('calculate').style.display = 'block'

   }
   else {
      showError('Please enter valid numbers...')
      document.getElementById('results').style.display = 'none'
      document.getElementById('loading').style.display = 'none'
      document.getElementById('calculate').style.display = 'block'

   }
}

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', e => {

   document.getElementById('results').style.display = 'none'
   document.getElementById('loading').style.display = 'block'
   document.getElementById('calculate').style.display = 'none'
   setTimeout(calculateResults, 2000)

   e.preventDefault()
})