
var term = new Terminal();

var confirmStartServer = function(){
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to start the game server",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      startServerAction();
    }
  })
};

var confirmStopServer = function(){
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to Stop this server ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      stopServerAction();
    }
  })
};

var startServerAction = function(){
  $.ajax({
    type: "POST",
    url: "startServer",
    success: function(data){
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Server Has been started',
        showConfirmButton: false,
        timer: 2500
      });
      updateServerStatus(true);
    },
    error: function(){
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Server Has been started',
        showConfirmButton: false,
        timer: 2500
      });
    },
    dataType: "json",
    contentType : "application/json"
  });
};

var stopServerAction = function(){
  $.ajax({
    type: "POST",
    url: "stopServer",
    success: function(data){
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Server Has been stopped',
        showConfirmButton: false,
        timer: 2500
      });
      updateServerStatus(false);
    },
    error: function(){
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Stop action failed',
        showConfirmButton: false,
        timer: 2500
      });
    },
    dataType: "json",
    contentType : "application/json"
  });
};


var runCommand = function(){
  var commandInput = $("#command-input").val();
  if(commandInput === ''){
    return;
  }
  $("#command-input").val('');
  $.ajax({
    type: "POST",
    url: "writeCommand",
    data: JSON.stringify({ "command": commandInput}),
    success: function(data){
    },
    error: function(){
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Failed to execute command',
        showConfirmButton: false,
        timer: 2500
      });
    },
    dataType: "json",
    contentType : "application/json"
  });
};

var updateServerStatus = function(isRunning){
  $("#server-status").removeClass("started");
  $("#server-status").removeClass("stopped");
  $("#stop-button").attr("disabled", false);
  $("#start-button").attr("disabled", false);
  $("#refresh-button").attr("disabled", false);
  $("#send-command-button").attr("disabled", false);
  $("#command-input").attr("disabled", false);
  if(isRunning){
    $("#server-status").addClass("started");
    $("#start-button").attr("disabled", true);
  }
  else{
    $("#server-status").addClass("stopped");
    $("#stop-button").attr("disabled", true);
    $("#refresh-button").attr("disabled", true);
    $("#send-command-button").attr("disabled", true);
    $("#command-input").attr("disabled", true);
  }
}

var refreshLogs = function(){
  $.ajax({
    type: "POST",
    url: "serverStatus",
    success: function(data){
      term.reset();
      term.write(data.output);
      updateServerStatus(data.isRunning);
    },
    error: function(){
      updateServerStatus(false);
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Error occured in server process',
        showConfirmButton: false,
        timer: 2500
      });
    },
    dataType: "json",
    contentType : "application/json"
  });
};

var initServerStatus = function(){
  $.ajax({
    type: "POST",
    url: "serverStatus",
    success: function(data){
      updateServerStatus(data.isRunning);
    },
    error: function(){
      updateServerStatus(false);
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Error occured in server process',
        showConfirmButton: false,
        timer: 2500
      });
    },
    dataType: "json",
    contentType : "application/json"
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-left',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

var bindKeys = function(){
  $('#command-input').keypress(function (e) {
    var key = e.which;
    if(key == 13)
     {
      runCommand();
     }
   });
};

$(window).on('load', function() {
  term.open(document.getElementById('terminal'));
  initServerStatus();
  bindKeys();
});

