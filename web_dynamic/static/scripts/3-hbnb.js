$(document).ready(function () {
  let checkedAmenities = {};

	const populateCheckedAmenities = function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    let checkedList = Object.values(checkedAmenities);
    if (checkedList.length) {
      $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
	}

  $(document).on('change', "input[type='checkbox']", populateCheckedAmenities.bind(this));

  $.get('http://localhost:5001/api/v1/status/', function (data, statusText) {
    if (statusText === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const placeEntry of data) {
				// if (placeEntry.owner) delete placeEntry.owner;
				// console.log(placeEntry);
        $('.places ').append('<article><h2>' + placeEntry.name + '</h2><div class="price_by_night"><p>$' + placeEntry.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + placeEntry.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + placeEntry.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + placeEntry.number_bathrooms + '</p></div></div><div class="description"><p>' + placeEntry.description + '</p></div></article>');
      }
    }
  });
});
