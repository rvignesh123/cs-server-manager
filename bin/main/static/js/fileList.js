/**
 * FileList Javascript
 * Author: Vignesh
 * Description: Loads the file list to this page
 */

var loadItems = function (data){
	$.each(data, function(index, value) {
		var faIcon = value.folder ? 'fa fa-folder-open' : 'fa fa-file';
		var icon = '<td class="action"><i class="'+faIcon+'"></i></td>';
		var hrefTarget =  window.location.href + '/'+value.name;
		if(value.name === '..'){
			hrefTarget = cutTrailingPath(hrefTarget);
		}
		var name = '<td class="name"><a href="'+cutTrailingSlash(hrefTarget)+'">'+value.name+'</a></td>';
		var size = '<td class="size">'+value.size+'</td>';
		var time = '<td class="time">'+value.time+'</td>';
		var tr = '<tr>'+icon+name+size+time+'</tr>';
		$('#fileTable').append(tr);
	});
};

var cutTrailingPath = function(site){
	site = site.substring(0,site.lastIndexOf('/'));
	site = site.substring(0,site.lastIndexOf('/'));
	return site;
};

var cutTrailingSlash = function(site){     
    return site.replace(/\/$/, "");
};
var setItemsFromServer = function(){
  $.ajax({
    type: "POST",
    url: "fileList",
    data: JSON.stringify({ "path": window.location.pathname}),
    success: function(data){
      loadItems(data);
    },
    error: function(){
      alert("failed");
    },
    dataType: "json",
    contentType : "application/json"
  });
};


$(window).on('load', function() {
	setItemsFromServer();
});