// Global variables
const workerModal = document.getElementById("add-worker-modal");
const btnAddWorker = document.getElementById("open-modal-btn");
const btnCloseModal = document.getElementById("btn-close-modal");
console.log(btnAddWorker);
console.log(workerModal);

btnAddWorker.addEventListener("click",(e)=>{
    console.log("clicked");
    workerModal.classList.remove("hidden")

});
btnCloseModal.addEventListener("click",(e)=>{
    console.log("clicked");
    workerModal.classList.add("hidden")

});