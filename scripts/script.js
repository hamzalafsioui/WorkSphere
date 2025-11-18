// Global variables
let employees = [];
let zones = document.querySelectorAll(".zone");
let unassignedList = document.getElementById("unassigned-list");
let experienceContainer = document.getElementById("experience-container");
console.log(zones);
console.log(unassignedList);
// ============== Local Storage ================
function loadFrmLocalStorage(){
  const data = localStorage.getItem('employees') || [];
  if(data){
    employees = JSON.parse(data);
    renderUnassigned();
  }
}
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}
// ================= Modals ===================
const workerModal = document.getElementById("modal-add-worker");

// ================= Buttons ===================
const btnAddWorker = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnSaveEmployee = document.getElementById("btn-save-employee");
const btnAddExperience = document.getElementById("btn-add-experience");

// ================= Input =====================
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const photoInput = document.getElementById("photo-input");
const roleSelect = document.getElementById("role-select");

const imgProfile = document.getElementById("img-profile");

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
  const phone = phoneInput.value.trim();
  const photo = photoInput.value.trim() || "default photo";
  const role = roleSelect.value;

  // catch all exp
  const expBoxes = document.querySelectorAll("#experience-container > div");
  const experiences = [];
  expBoxes.forEach((box) => {
    const title = box.querySelector(".exp-input")?.value.trim() || "";
    const from = box.querySelector(".from-input")?.value || "";
    const to = box.querySelector(".to-input")?.value || "";
    if (title != "") {
      experiences.push({
        title,
        from,
        to,
      });
    }
  });

  employees.push({
    id: Date.now(),
    name,
    phone,
    email,
    photo,
    role,
    experiences,
    zone: null,
  });

  workerModal.classList.add("hidden");
  clearModalFields();
  renderUnassigned();
  saveToLocalStorage();
  console.log(employees);
});

btnAddExperience.addEventListener('click', () => {

    // exp box
    const expBox = document.createElement("div");
    expBox.className = "p-3 border rounded-lg bg-gray-50 space-y-2";

  const expInput = document.createElement("input");
  expInput.type = "text";
  expInput.placeholder = "Experience / Job Title";
  expInput.classList.add("input-field", "w-full");
  expInput.classList.add("exp-input");

  // from
  const fromGroup = document.createElement("div");
  fromGroup.className = "flex flex-col gap-1";

  const fromLabel = document.createElement("label");
  fromLabel.textContent = "From";
  fromLabel.className = "text-sm font-semibold";

  const fromInput = document.createElement("input");
  fromInput.type = "date";
  fromInput.classList.add("input-field");
  fromInput.classList.add("from-input");

  fromGroup.appendChild(fromLabel);
  fromGroup.appendChild(fromInput);

  // to
  const toGroup = document.createElement("div");
  toGroup.className = "flex flex-col gap-1";

  const toLabel = document.createElement("label");
  toLabel.textContent = "To";
  toLabel.className = "text-sm font-semibold";

  const toInput = document.createElement("input");
  toInput.type = "date";
  toInput.classList.add("input-field");
  toInput.classList.add("to-input");

  toGroup.appendChild(toLabel);
  toGroup.appendChild(toInput);

  expBox.appendChild(expInput);

  const datesRow = document.createElement("div");
  datesRow.className = "grid grid-cols-2 gap-4";
  datesRow.appendChild(fromGroup);
  datesRow.appendChild(toGroup);

  expBox.appendChild(datesRow);

  experienceContainer.appendChild(expBox);
});

// ================== Functions =============

function clearModalFields() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  photoInput.value = "";
  experienceContainer.innerHTML = "";
}

function renderUnassigned() {
  unassignedList.innerHTML = "";
  const filtered = employees.filter((e) => !e.zone);
  filtered.forEach((emp) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "bg-gray-100",
      "p-3",
      "rounded",
      "shadow-sm"
    );
    li.dataset.id = emp.id;
    li.innerHTML = `
     <div class="flex items-center gap-2">
        <img src="${emp.photo}" class="w-10 h-10 rounded object-cover">
        <span class = "text-xs sm:text-sm font-semibold">${emp.name} (${emp.role})</span>
      </div>
      <button class="text-red-600 font-bold p-1 text-sm md:text-base">X</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      employees = employees.filter((e) => e.id != emp.id);
      renderUnassigned();
      saveToLocalStorage();
    });
    //

    unassignedList.appendChild(li);
  });
}


// Run 
loadFrmLocalStorage();