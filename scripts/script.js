// Global variables
let employees = [];
let zones = document.querySelectorAll(".zone");
console.log(zones);
// ============== Local Storage ================

// ================= Modals ===================
const workerModal = document.getElementById("modal-add-worker");

// ================= Buttons ===================
const btnAddWorker = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnSaveEmployee = document.getElementById("btn-save-employee");
// ================= Input =====================
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const photoInput = document.getElementById("photo-input");
const roleSelect = document.getElementById("role-select");

console.log(btnAddWorker);
console.log(workerModal);

// =========== Event Listener ===================
btnAddWorker.addEventListener("click", (e) => {
  console.log("clicked");
  workerModal.classList.remove("hidden");
});
btnCloseModal.addEventListener("click", (e) => {
  console.log("clicked");
  workerModal.classList.add("hidden");
});

btnSaveEmployee.addEventListener("click", (e) => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone =  phoneInput.value.trim();
  const photo =  photoInput.value.trim() || "default photo";
  const  role = roleSelect.value;

  employees.push({
    id: Date.now(),
    name:name,
    phone:phone,
    email:email,
    role:role,
    experiences:{}
  });

  workerModal.classList.add("hidden");
  clearModalFields();
  saveToLocalStorage();
  console.log(employees);
});

// ================== Functions =============

function clearModalFields(){
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    photoInput.value = "";
    // clear experiences
}

function saveToLocalStorage(){
    localStorage.setItem("employees",JSON.stringify(employees));
}