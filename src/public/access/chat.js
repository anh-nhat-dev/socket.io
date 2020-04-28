const socket = io.connect('http://localhost:3000');


const listRooms = $('#list-rooms');

/**
 *
 *
 * @param {*} root
 * @param {*} room
 */
function addNewRoomHtml(root, room) {
    root.append(`
        <a id="giao-luu" class="list-group-item list-group-item-action rounded-0" data-id="giao-luu">
        <div class="media">
            <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Room: ${room.name}</h6>
                </div>
            </div>
        </div>
      </a>
    `)
}

socket.emit("GET-ROOMS");
socket.on("RETURN-GET-ROOMS", function(data) {
    const rooms = data.rooms;
    if (!rooms && rooms.length) return;

    rooms.forEach(function(room) {
        addNewRoomHtml(listRooms, room)
    })

});