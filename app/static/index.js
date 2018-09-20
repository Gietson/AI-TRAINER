function evaluate(e) {


    var formData = new FormData();
    formData.append('file', $('#picture')[0].files[0]);
    formData.append('folder_name', $('input[name=model]:checked').val())

    msgbox = $('#message')
    msgbox.html(`<div class="col-xs-12 col-sm-12 progress-container">
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-success" style="width:0%"></div>
                    </div>
                </div>`)
    $(".progress-bar").animate({
        width: "70%"
    }, 2500);

    $.ajax({
        url: 'api/evaluate',
        type: 'POST',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data, statusText, xhr) {
            data = JSON.parse(data)
            console.log(data);
            //result_table = $('<table class="table" id="result"><thead> <tr><th>Label</th><th>Confidence</th></tr></thead><tbody></tbody></table>')
            var list = msgbox.append('<ul class="list-group"></ul>').find('ul');
            for (res of data[1]) {
                list.append('<li class="list-group-item">' + res + '</li>');
            }
            //for(res of data[1]){
            //result_table.find('tbody').append('<tr><td>'+res[0]+'</td><td>'+Number(res[1])*100+'%</td></tr>')
            //}
            //msgbox.html('<img height="500px" src="' + data[0] + '" />')
            var oFReader = new FileReader();
            oFReader.readAsDataURL($('#picture')[0].files[0]);

            oFReader.onload = function (oFREvent) {
                msgbox.html('<img height="500px" src="' + oFREvent.target.result + '" />');
                msgbox.prepend(list);
            };

            //msgbox.html('<img height="500px" src="' + formData["file"] + '" />');
            //msgbox.prepend(list);
        },
        error: function (xhr, statusText, err) {
            alert("Error:" + xhr.status);
        }
    });

}

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};
$('#form').on('submit', function (e) {
    e.preventDefault();
    evaluate(e)
});