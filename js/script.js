// POST https://rel.ink/api/links/

// {
//   "url": "https://news.ycombinator.com/"
// }

// GET https://rel.ink/api/links/Nn8y9p/

// {
//   "hashid":"Nn8y9p",
//   "url": "https://news.ycombinator.com/",
//   "created_at":"2019-06-18T21:29:57.922801Z"
// }


$(document).ready(function () {
	$('#urlaction').on('click', function (event) {
		event.preventDefault();
	});

	var input_url = $('#input_url');
	var error_font = $('.error_font');
	var input_url = $('.input_url');

	$('#urlaction').on('click', function () {
		if (input_url.val() == '') {
			// console.log('error');
			error_font.addClass('error_font_open');
			input_url.addClass('input_url_error');
		} else {
			// console.log('error');
			error_font.removeClass('error_font_open');
			input_url.removeClass('input_url_error');

			// console.log($input_url.val());
			var $input_url = $('#input_url');
			var $urlName = $input_url.val();
			var postData = {
				url : $urlName,
			};
			var link = 'rel.ink/';
			var $link_result = $('.result_container');
			var relink_output;

			$.ajax({
				type    : 'POST',
				url     : 'https://rel.ink/api/links/',
				// contentType : 'appilcation/json',
				data    : postData,
				success : function (data) {
					// console.log('success', data);
					// console.log(link + data.hashid);
					$link_result.append(
						// `<input class="relink_output" disabled value="${link}${data.hashid}" >${link}${data.hashid} </input>`,
						` <div class="flex result"><div class="flex listed">
						  <div>
							<input class="input_url_output input_url_outputlink" type="text" disabled value="${data.url}">
						  </div>
			  
						  <div class="link_result">
							<input class="input_url_output relink_output input_url_output2" unselectable="on" id="input_url_output" type="text" disabled readonly value="${link}${data.hashid}">
						  </div>
						</div>
						  <div>
							<input type="button" class="copy_active main_btn" value="copy" id="markup_copy" >
						  </div>
						</div>`,
					);
					$('#markup_copy').click(function () {
						var input_url_output = $('#input_url_output');
						input_url_output.removeAttr('disabled');
						input_url_output.select();
						// input_url_output.setSelectionRange(0, 99999);
						document.execCommand('copy');
						$('#markup_copy')
							.val('Copied!')
							.show()
							.css('background-color', 'hsl(257, 27%, 26%)', 'border', '1px solid hsl(257, 27%, 26%)');
						input_url_output.attr('disabled', 'disabled');
					});
				},
			});
		}
	});

	$('.input_url').on('focus', function () {
		error_font.removeClass('error_font_open');
		input_url.removeClass('input_url_error');
	});

	
});

