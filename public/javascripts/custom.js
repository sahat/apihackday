$(document).ready(function() {
    $('#ruby').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#python').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#php').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#javascript').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#photoshop').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#illustrator').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#frontend').click(function() {
      $(this).toggleClass('active');
      console.log('done');
    });

    $('#join_group2').click(function() {
    	$(this).attr('disabled', 'true');
    	$('#photorow_group2').append('<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/157141_100000588912346_1949363080_q.jpg">')
    	return false;

    });

    
  });