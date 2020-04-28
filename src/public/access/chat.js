const socket = io.connect("http://localhost:3000");

const listRooms = $("#list-rooms");
let currentRoom;

/**
 *
 *
 * @param {*} root
 * @param {*} room
 */
function addNewRoomHtml(root, room) {
  root.append(`
        <a id="${room.id}" class="list-group-item list-group-item-action rounded-0" data-id="giao-luu">
        <div class="media">
            <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Room: ${room.name}</h6>
                </div>
            </div>
        </div>
      </a>
    `);
}

socket.emit("GET-ROOMS");
socket.on("RETURN-GET-ROOMS", function (data) {
  const rooms = data.rooms;
  if (!rooms && rooms.length) return;

  rooms.forEach(function (room) {
    addNewRoomHtml(listRooms, room);
  });

  $(".list-group-item").on("click", function () {
    const id = $(this).attr("id");
    socket.emit("CONNECT-ROOM-CHAT", { id });
  });
  socket.emit("CONNECT-ROOM-CHAT", { id: rooms[0].id });
});

socket.on("CONNECT-ROOM-CHAT-SUCCESS", function (data) {
  const id = data.id;
  $(".list-group-item.active").removeClass("active");
  $(`#${id}`).addClass("active");
  currentRoom = id;
});

socket.on("NEW-MESSAGE", function (data) {
  $("#chat-box").append(`<div class="media w-50 mb-3">
              <div class="media-body ml-3">
                <b class="client" data-id="zlFgvbic1EYmxfQwAAAB" data-name="Nguyen Van B">Nguyen Van B</b>
                <div class="bg-light rounded py-2 px-3 mb-2">
                  <p class="text-small mb-0 text-muted">${data.message}</p>
                </div>
              </div>
            </div>`);
});

$("#input-message").keyup(function (e) {
  const self = $(this);
  if (e.keyCode === 13) {
    const value = self.val();
    self.val("");
    socket.emit("NEW-MESSAGE", { message: value, currentRoom });
    $("#chat-box").append(`<div class="media w-50 mb-3 ml-auto">
              <div class="media-body ml-3">
                <div class="bg-primary rounded py-2 px-3 mb-2">
                  <p class="text-small mb-0 text-white">${value}</p>
                </div>
              </div>
      </div>`);
  }
});

// $(document).ready(function () {
console.log($("a"));
$(".list-group-item").on("click", function (e) {
  console.log(e);
});
// });

