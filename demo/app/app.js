(function() {
  var contentDiv = document.querySelector('.demo-content');
  contentDiv.innerHTML = 'Loading...';

  var transactionId = window.location.search.split('=')[1];
  if (transactionId) {
    axios.get('/transactions/' + transactionId).then(function(response) {
      var transaction = response.data.transaction;
      if (!transaction) {
        contentDiv.innerHTML =
          'Transaction with ID ' + transactionId + ' not found.' +
          '<p><div class="ui animated primary button another" tabindex="0">' +
            '<div class="visible content">Go to Pay</div>' +
            '<div class="hidden content">' +
              '<i class="left arrow icon"></i>' +
            '</div>' +
          '</div></p>';
      } else {
        contentDiv.innerHTML =
          'Transaction with ID ' + transactionId + ' completed.' +
          '<p><div class="ui list">' +
            '<div class="item">' +
              '<i class="idea icon"></i><div class="content">Succeeded: ' + (transaction.success ? 'Yes' : 'No')  + '</div>' +
            '</div>' +
            '<div class="item">' +
              '<i class="calendar icon"></i><div class="content">Date: ' + transaction.date + '</div>' +
            '</div>' +
            '<div class="item">' +
              '<i class="money icon"></i><div class="content">Amount: ' + transaction.amount + ' ' + transaction.currency + '</div>' +
            '</div>' +
          '</div></p>' +
          '<div class="ui animated primary button another" tabindex="0">' +
            '<div class="visible content">Pay another</div>' +
            '<div class="hidden content">' +
              '<i class="left arrow icon"></i>' +
            '</div>' +
          '</div>';
      }

      var anotherButton = document.querySelector('.another');
      return anotherButton.addEventListener('click', function(event) {
        window.location.href = '/app';
      });
    });
  } else {
    contentDiv.innerHTML =
      '<div class="ui input">' +
        '<input class="amount" type="number" placeholder="Enter Amount">' +
      '</div> ' +
      '<div class="ui animated positive button pay" tabindex="0">' +
        '<div class="visible content">Pay at OTP Bank</div>' +
        '<div class="hidden content">' +
          '<i class="right arrow icon"></i>' +
        '</div>' +
      '</div>';

    var payButton = document.querySelector('.pay');
    payButton.addEventListener('click', function(event) {
      var amountInput = document.querySelector('.amount');
      var payButton = document.querySelector('.pay');
      var amount = amountInput.value;

      return axios.post('/pay', { amount: amount }).then(function(response) {
        var url = response.data.url;
        window.location.href = url;
      });
    });
  }
})();
