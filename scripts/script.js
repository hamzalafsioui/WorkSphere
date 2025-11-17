// Global variables
let employees = [];
let zones = document.querySelectorAll(".zone");
console.log(zones);
// ============== Local Storage ================


// ================= Modals ===================
const workerModal = document.getElementById("add-worker-modal");


// ================= Buttons ===================
const btnAddWorker = document.getElementById("open-modal-btn");
const btnCloseModal = document.getElementById("btn-close-modal");

// ================= Input =====================


console.log(btnAddWorker);
console.log(workerModal);

// =========== Event Listener ===================
btnAddWorker.addEventListener("click",(e)=>{
    console.log("clicked");
    workerModal.classList.remove("hidden")

});
btnCloseModal.addEventListener("click",(e)=>{
    console.log("clicked");
    workerModal.classList.add("hidden")

});