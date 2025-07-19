const loadAllData = async (spinner) => {
  const spinners = document.getElementById('spinner').classList.add("hidden")

  console.log(spinner)
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await res.json();

  displayAllData(data.pets);

};

const Allcatagore = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await res.json();
  displayAllcategories(data.categories);
};

const showpad = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`);
  const data = await res.json();
  document.getElementById("cardContainer").innerHTML = ""; // Hide default



  displayallcatagory(data.data);
  // console.log(data.data.length)
};

const displayAllcategories = (data) => {

  const catagoriContainer = document.getElementById('catagoriContainer');

  catagoriContainer.innerHTML = "";


  data.forEach((item) => {
    const button = document.createElement('div');
    button.classList = "flex items-center gap-2 border  px-10 py-4 rounded-[120px] cursor-pointer hover:bg-slate-100";
    button.innerHTML = `
      
      <div onclick="showpad('${item.category}')" class="font-bold text-xl text-[#131313] flex"> <img class="w-[35px] h-[30px]" src="${item.category_icon}" alt=""> ${item.category}</div>
    `;
    catagoriContainer.appendChild(button);
  });
};

const displayAllData = (data) => {
  const cardContainer = document.getElementById("cardContainer");
  const cardContainer2 = document.getElementById("cardContainer2");
  cardContainer.innerHTML = "";
  cardContainer2.innerHTML = ""; // Hide filtered

  data.forEach((item) => {
    const { gende, breed, date_of_birth, price, pet_name, image, petId } = item;
    const card = document.createElement('div');
    card.classList = "shadow-lg rounded bg-slate-200 p-4 flex flex-col justify-between";

    card.innerHTML = `
      <figure><img class="rounded w-full h-48 object-cover" src="${image}" alt="Pet" /></figure>
      <div class="mt-5">
        <h1 class="text-xl font-bold">${pet_name}</h1>
        <p>Breed: ${breed}</p>
        <p>Birth: ${date_of_birth}</p>
        <p>Gender: ${gende}</p>
        <p>Price: ${price}</p>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <img src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt="Like Icon" class="w-6 h-6 cursor-pointer" />
        <button class="btn text-[#0E7A81]">Adopt</button>
        <button onclick="displayModal('${petId}')" class="btn text-[#0E7A81]">Details</button>
      </div>
    `;
    cardContainer.appendChild(card);
  });
};


const displayallcatagory = (data) => {
  console.log(data.length)
  // noDataMessage.innerHTML="";

  document.getElementById('cardContainer').classList.add("hidden")
  const cardContainer2 = document.getElementById('cardContainer2');
  const noDataMessage = document.getElementById("noDataMessage")
  cardContainer2.innerHTML = "";
  if (data.length === 0) {
    noDataMessage.classList.remove("hidden")
    return;
  }
  else {
    noDataMessage.classList.add("hidden")
  }

  data.forEach((item) => {
    const { gende, breed, date_of_birth, price, pet_name, image } = item;
    const card = document.createElement('div');
    card.classList = "shadow-lg rounded bg-slate-200 p-4";
    card.innerHTML = `
      <figure><img class="rounded w-full h-48 object-cover" src="${image}" alt="Pet" /></figure>
      <div class="mt-5">
        <h1 class="text-xl font-bold">${pet_name}</h1>
        <p>Breed: ${breed}</p>
        <p>Birth: ${date_of_birth}</p>
        <p>Gender: ${gende}</p>
        <p>Price: ${price}</p>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <img src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt="Like Icon" class="w-6 h-6 cursor-pointer" />
        <button class="btn text-[#0E7A81]">Adopt</button>
        <button onclick="displayModal()" class="btn text-[#0E7A81]">Details</button>
      </div>
    `;
    cardContainer2.appendChild(card);
  });
};

// show modal
const displayModal = async (id) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
   const data = await res.json()
  
  const modalContainer = document.getElementById("modalContainer")

  modalContainer.innerHTML = `
      <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
  <img src="">
   <div>
     
   </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `

  my_modal_1.showModal()
}

// show modal



const spinner = document.getElementById('spinner').classList.remove("hidden")
setTimeout(() => {
  loadAllData(spinner)
}, 3000);

// Load categories and all data on page load
Allcatagore();
// loadAllData();
