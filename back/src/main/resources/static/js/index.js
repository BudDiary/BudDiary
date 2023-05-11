let subscribeUrl = "http://localhost:8080/sub";

let eventSource = new EventSource(subscribeUrl);

eventSource.addEventListener("DOUBLE_INVITE", function(event) {
    let message = event.data;
    alert(message);
    console.log("message");
})

eventSource.addEventListener("error", function(event) {
    console.log("error");
    eventSource.close()
})