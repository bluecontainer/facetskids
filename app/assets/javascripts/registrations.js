$('.registrations, .invitations').ready(function() {
  $.externalScript('https://js.stripe.com/v1/').done(function(script, textStatus) {
      Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
      var subscription = {
        setupForm: function() {
          //return $('.card_form').submit(function() {
          return $(document).on("submit", ".card_form", function() {
            $('input[type=submit]').prop('disabled', true);
            //if ($('#card_number').length && $('#card_number').value() != "") {
            //if ($('#card_number').length && $('#card_number')[0].value != "") {
            //if ($('#card_number').length && $(this)('#card_number')[0].value != "") {
            console.log($(this).find('#card_number').val());
            if ($(this).find('#card_number').val() != "") {
              subscription.processCard($(this));
              return false;
            } else {
              return true;
            }
          });
        },
        processCard: function(elem) {
          var card;
          card = {
            name: elem.find('#user_name').val(),
            number: elem.find('#card_number').val(),
            cvc: elem.find('#card_code').val(),
            expMonth: elem.find('#card_month').val(),
            expYear: elem.find('#card_year').val(),
            addressZip: elem.find('#address_zip').val()
          };
          var curriedHandler = _.curry(subscription.handleStripeResponse)
          return Stripe.createToken(card, curriedHandler(elem));
        },
        handleStripeResponse: function(elem, status, response) {
          if (status === 200) {
            elem.find('#user_stripe_token').val(response.id)
            elem[0].submit()
          } else {
            $('#stripe_error').text(response.error.message).show();
            return $('input[type=submit]').prop('disabled', false);
          }
        }
      };
      return subscription.setupForm();
  });
});
