document.addEventListener('DOMContentLoaded', function () {
    var stripe = Stripe('pk_test_51OCizILLmtJgsGjhROob6pH9SyhRl3P0NUbt1nGltPc3LFK7DThOCBp97Bipxg5kdllxZCVEIYjJZNutyQrDGBvy00yXMFUcvH'); // Replace with your actual Stripe public key
    var elements = stripe.elements();
  
    // Create an instance of the card Element
    var card = elements.create('card');
  
    // Add an instance of the card Element into the `card-element` div
    card.mount('#card-element');
  
    var amountInput = document.getElementById('amount');
    var donateButton = document.getElementById('donate-button');
    var cardErrors = document.getElementById('card-errors');
    
    donateButton.addEventListener('click', function () {
      var donationAmount = parseFloat(amountInput.value);
      console.log(donationAmount);
      // Create a payment method using the card Element
      stripe.createPaymentMethod({
        type: 'card',
        card: card,
      }).then(function (result) {
        if (result.error) {
          // Display error to the user
          cardErrors.textContent = result.error.message;
        } else {
          // Send the donation amount and payment method to your server
          fetch('http://localhost:8080/api/process-donation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: donationAmount,
              payment_method: result.paymentMethod.id,
            }),
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (responseJson) {
            // Handle the server response as needed
            console.log('Payment succeeded:', responseJson.client_secret);
          })
          .catch(function (error) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again later.');
          });
        }
      });
    });
  });
  