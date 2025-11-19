// Global variables
let employees = [];
let zones = document.querySelectorAll(".zone");
let unassignedList = document.getElementById("unassigned-list");
let experienceContainer = document.getElementById("experience-container");
console.log(zones);
console.log(unassignedList);
// ============== Local Storage ================
function loadFrmLocalStorage() {
  const data = localStorage.getItem("employees") || [];
  if (data) {
    employees = JSON.parse(data);
    renderUnassigned();
  }
}
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}
// ================= Modals ===================
const workerModal = document.getElementById("modal-add-worker");
const profileModal = document.getElementById("modal-profile");
const selectModal = document.getElementById("select-modal");

// ================= Buttons ===================
const btnAddWorker = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnSaveEmployee = document.getElementById("btn-save-employee");
const btnAddExperience = document.getElementById("btn-add-experience");
const btnCloseProfile = document.getElementById("btn-close-profile");
const btnCloseSelectModal = document.getElementById("btn-close-select-modal");

const btnAddZone = document.querySelector(".zone-btn-add");

// ================= Input =====================
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const photoInput = document.getElementById("photo-input");

const roleSelect = document.getElementById("role-select");
const listSelect = document.getElementById("select-list");

const imgProfile = document.getElementById("img-profile");

//  profile elements
const profilePhoto = document.getElementById("profile-photo");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const profileZone = document.getElementById("profile-zone");
const profileExperiences = document.getElementById("profile-experiences");

console.log(btnAddWorker);
console.log(workerModal);

// =========== Event Listener ===================
btnAddWorker.addEventListener("click", (e) =>
  workerModal.classList.remove("hidden")
);
btnCloseModal.addEventListener("click", (e) =>
  workerModal.classList.add("hidden")
);
btnCloseSelectModal.addEventListener("click", () =>
  selectModal.classList.add("hidden")
);

btnSaveEmployee.addEventListener("click", (e) => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const photo = photoInput.value.trim();
  const role = roleSelect.value;

  // catch all exp
  const expBoxes = document.querySelectorAll("#experience-container > div");
  const experiences = [];
  expBoxes.forEach((box) => {
    const title = box.querySelector(".exp-input")?.value.trim() || "";
    const from = box.querySelector(".from-input")?.value || "";
    const to = box.querySelector(".to-input")?.value || "";
    if (title != "" && from != "" && to != "") {
      experiences.push({
        title,
        from,
        to,
      });
    }
  });

  if (!validationInputs(name, email, phone, experiences)) {
    console.log("not valid inputs");

    return;
  }
  console.log("valid inputs");

  employees.push({
    id: Date.now(),
    name,
    phone,
    email,
    photo: imgProfile.src,
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

photoInput.addEventListener("change", () => {
  imgProfile.src = photoInput.value.trim();
  console.log(imgProfile);
});

imgProfile.onerror = () => {
  imgProfile.src =
    "https://media.licdn.com/dms/image/v2/C4D03AQGr2NICwDJcOg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1651428759649?e=1765411200&v=beta&t=cegABWEEZC0UCwAbsGBnlVaIP_1w0UD9kLo0w8rq7aU";
};

btnAddExperience.addEventListener("click", () => {
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
btnCloseProfile.addEventListener("click", () =>
  profileModal.classList.add("hidden")
);

// ================== Functions =============

function clearModalFields() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  photoInput.value = "";
  experienceContainer.innerHTML = "";
  imgProfile.src = "";
}

function showProfile(id) {
  const emp = employees.find((e) => e.id == id);
  if (!emp) return;
  profilePhoto.src = emp.photo;
  profileName.textContent = emp.name;
  profileRole.textContent = emp.role;
  profileEmail.textContent = emp.email || "-";
  profilePhone.textContent = emp.phone || "-";
  profileZone.textContent = emp.zone || "Unassigned";

  profileExperiences.innerHTML = "";
  emp.experiences.forEach((exp) => {
    const li = document.createElement("li");
    li.textContent = `${exp.title} [${exp.from} || ${exp.to}]`;
    profileExperiences.appendChild(li);
  });

  profileModal.classList.remove("hidden");
}

function assignEmployeeToZone(id, zoneName) {
  const emp = employees.find((e) => e.id == id);
  if (!emp) return;

  const zone = document.querySelector(`.zone[data-zone="${zoneName}"]`);
  const limit = parseInt(zone.dataset.limit);
  const currentCount = employees.filter((e) => e.zone === zoneName).length;

  if (currentCount >= limit) {
    alert(`Zone limit reached! (-`);
    return;
  }
  if (!canAssign(emp.role, zoneName)) {
    alert(`${emp.role} can't be assigned to this zone! (-`);
    return;
  }
  emp.zone = zoneName;
  renderUnassigned();
  renderZones();
  saveToLocalStorage();
}

// =============== Validation =======================

function validationInputs(name, email, phone, exps) {
  // Name
  if (!name || name.length < 2) {
    alert("Name must be at least 2 characters");
    return false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || !emailRegex.test(email)) {
    alert("Invalid email format");
    return false;
  }

  // Phone
  const phoneRegex = /^[0-9+\-\s]{6,15}$/;
  if (phone === "" || !phoneRegex.test(phone)) {
    alert("Invalid phone number");
    return false;
  }

  // Experiences [from < to]
  for (let exp of exps) {
    if (!validateDates(exp.from, exp.to)) {
      alert(`Experience "${exp.title}": 'From' date must be before 'To' date`);
      return false;
    }
  }

  return true;
}

function validateDates(from, to) {
  if (!from || !to) return false;
  return new Date(from) < new Date(to);
}

// =========== render Functions ============
function renderUnassigned() {
  unassignedList.innerHTML = "";
  const filtered = employees.filter((e) => !e.zone);
  filtered.forEach((emp) => {
    const li = document.createElement("li");
    li.classList.add(
      "relative",
      "flex",
      "items-center",
      "justify-between",
      "bg-gray-100",
      "p-1",
      "rounded",
      "shadow-sm"
    );
    li.dataset.id = emp.id;
    li.innerHTML = `
  <div class="flex items-center gap-1">
    <img src="${emp.photo}" 
         class="w-6 h-6 md:w-10 md:h-10 rounded-full object-cover">

    <span class="text-[8px] sm:text-[10px] md:text-sm font-semibold cursor-pointer">
      ${emp.name} (${emp.role})
    </span>
  </div>

  <button class="
    absolute -top-1 -right-1
    w-5 h-5 md:w-6 md:h-6
    flex items-center justify-center
    opacity-0
    bg-red-500 text-white
    rounded-full
    text-[10px] md:text-xs
    font-bold
    cursor-pointer
  ">X</button>
`;

    li.addEventListener("mouseover", () => {
      li.querySelector("button").style.opacity = 1;
    });
    li.addEventListener("mouseleave", () => {
      li.querySelector("button").style.opacity = 0;
    });
    li.querySelector("button").addEventListener("click", () => {
      employees = employees.filter((e) => e.id != emp.id);
      renderUnassigned();
      saveToLocalStorage();
    });
    // show profile when the user click
    // Profile click
    li.querySelector("span").addEventListener("click", () => {
      showProfile(emp.id);
      console.log(emp.id);
    });

    unassignedList.appendChild(li);
  });
}

function renderZones() {
  zones.forEach((zone) => {
    const zoneName = zone.dataset.zone;
    const limit = parseInt(zone.dataset.limit);
    const container = zone.querySelector(".zone-content");
    container.innerHTML = "";
    const zoneEmployees = employees.filter((e) => e.zone === zoneName);

    zoneEmployees.forEach((emp) => {
      const div = document.createElement("div");
      div.classList.add("zone-item");
      div.dataset.id = emp.id;
      div.innerHTML = `
  <div class="flex items-center gap-1 p-1 bg-white rounded shadow relative cursor-pointer 
              w-[70px] md:w-[150px]">

      <img src="${emp.photo}" 
           class="w-6 h-6 md:w-10 md:h-10 rounded-full object-cover">

      <div class="flex flex-col leading-tight">
          <span class="text-[8px] md:text-sm font-semibold">${emp.name}</span>
          <span class="text-[6px] md:text-xs text-gray-600">${emp.role}</span>
      </div>

      <button class="
          absolute -top-1 -right-1
          w-4 h-4 md:w-5 md:h-5
          flex items-center justify-center opacity-0
          bg-red-500 text-white rounded-full text-[7px] md:text-xs font-bold
      ">X</button>
  </div>
`;

      // when the user click on X
      div.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        emp.zone = null;
        renderUnassigned();
        renderZones();
        saveToLocalStorage();
      });
      div.addEventListener("mouseover", () => {
        div.querySelector("button").style.opacity = 1;
        console.log("mouse hover");
      });
      div.addEventListener("mouseleave", () => {
        div.querySelector("button").style.opacity = 0;
      });

      div.addEventListener("click", () => showProfile(emp.id));

      container.appendChild(div);
    });
  });
}

// ======== zone assign ==========
zones.forEach((zone) => {
  const addBtn = zone.querySelector(".zone-btn-add");
  addBtn.addEventListener("click", () => {
    console.log("button clicked");
    console.log(zone.dataset.zone);

    const zoneName = zone.dataset.zone;
    showSelectModal(zoneName);
  });
});

function showSelectModal(zoneName) {
  console.log(zoneName);

  const limit = parseInt(
    document.querySelector(`.zone[data-zone="${zoneName}"]`).dataset.limit
  );
  console.log(limit);

  const currentCount = employees.filter((e) => e.zone === zoneName).length;
  console.log(currentCount);

  listSelect.innerHTML = "";

  const allowEmployees = employees
    .filter((e) => !e.zone)
    .filter((emp) => canAssign(emp.role, zoneName));
  console.log(allowEmployees);

  allowEmployees.forEach((emp) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "bg-gray-100",
      "p-2",
      "rounded",
      "cursor-pointer"
    );
    li.textContent = `${emp.name} (${emp.role})`;

    li.addEventListener("click", () => {
      if (currentCount >= limit) {
        alert("Zone limit reached! (-");
        return;
      }
      assignEmployeeToZone(emp.id, zoneName);
      selectModal.classList.add("hidden");
    });

    listSelect.appendChild(li);
  });

  selectModal.classList.remove("hidden");
}

// =============== Role Rules ============
function canAssign(role, zoneName) {
  const r = role.toLowerCase();
  // manager
  if (r === "manager") {
    return true;
  }
  // cleaning
  if (r === "cleaning") {
    return zoneName !== "archives";
  }

  // receptionist
  if (r === "receptionist") {
    console.log(r);

    return zoneName === "reception";
  }

  // it
  if (r === "it") {
    return zoneName === "servers";
  }
  // security
  if (r === "security") {
    return zoneName === "security";
  }

  if (r === "other") {
    return zoneName === "conference" || zoneName === "staff";
  }

  // default access dinied
  return false;
}

// Run
loadFrmLocalStorage();
renderZones();
