
var term = new Terminal();


var startServerAction = function(){
  $.ajax({
    type: "POST",
    url: "startServer",
    data: JSON.stringify({ "path": window.location.pathname}),
    success: function(data){
      console.log(data)
    },
    error: function(){
      alert("failed");
    },
    dataType: "json",
    contentType : "application/json"
  });
};

var getServerLogs = function(){
  $.ajax({
    type: "POST",
    url: "serverStatus",
    data: JSON.stringify({ "path": window.location.pathname}),
    success: function(data){
      term.reset();
      term.write(data.output);
    },
    error: function(){
      alert("failed");
    },
    dataType: "json",
    contentType : "application/json"
  });
};

var writeCommand = function(){
  $.ajax({
    type: "POST",
    url: "writeCommand",
    data: JSON.stringify({ "command": $("#command").val()}),
    success: function(data){
      $("#log").text(data.output);
    },
    error: function(){
      alert("failed");
    },
    dataType: "json",
    contentType : "application/json"
  });
};

$(window).on('load', function() {
  term.open(document.getElementById('terminal'));
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();
});

