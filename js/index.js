
 let allPets = [];

const loadAllData = async () => {
  document.getElementById('spinner').classList.remove("hidden");

  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await res.json();

    allPets = data.pets; // Store globally for sorting
  displayAllData(allPets);

  document.getElementById('spinner').classList.add("hidden");

};

const Allcatagore = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await res.json();
  displayAllcategories(data.categories);
};

const showpad = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`);
  const data = await res.json();
  document.getElementById("cardContainer").innerHTML = "";

  displayallcatagory(data.data);
  console.log(data.data)
  
};

const displayAllcategories = (data) => {
  const catagoriContainer = document.getElementById('catagoriContainer');
  catagoriContainer.innerHTML = "";

  data.forEach((item) => {
    const button = document.createElement('div');
    button.classList = "flex items-center gap-2 border px-10 py-4 rounded-[120px] cursor-pointer hover:bg-slate-100";
    button.innerHTML = `
      <div onclick="showpad('${item.category}')" class="font-bold text-xl text-[#131313] flex">
        <img class="w-[35px] h-[30px]" src="${item.category_icon}" alt=""> ${item.category}
      </div>
    `;
    catagoriContainer.appendChild(button);
  });
};

const displayAllData = (data) => {
  const cardContainer = document.getElementById("cardContainer");
  const cardContainer2 = document.getElementById("cardContainer2");
  cardContainer.innerHTML = "";
  cardContainer2.innerHTML = "";
 document.getElementById("cardContainer").classList.remove("hidden");
  data.forEach((item) => {
    const { gende, breed, date_of_birth, price, pet_name, image, petId } = item;
    const card = document.createElement('div');
    card.classList = "shadow-lg rounded bg-slate-200 p-4  flex flex-col justify-between";

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
        <img onclick="addfavarit('${image}')" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt="Like Icon" class="w-6 h-6 cursor-pointer" />
        <button onclick="displayinterval()" class="btn text-[#0E7A81]">Adopt</button>
        <button onclick="displayModal('${petId}')" class="btn text-[#0E7A81]">Details</button>
      </div>
      `;
      cardContainer.appendChild(card);
     
    
  });
};

const displayallcatagory = (data) => {
  document.getElementById('cardContainer').classList.add("hidden");
  const cardContainer2 = document.getElementById('cardContainer2');
  const noDataMessage = document.getElementById("noDataMessage");

  cardContainer2.innerHTML = "";
  if (data.length === 0) {
    noDataMessage.classList.remove("hidden");
    return;
  } else {
    noDataMessage.classList.add("hidden");
  }

  data.forEach((item) => {
    const { gende, breed, date_of_birth, price, pet_name, image, petId } = item;
    const card = document.createElement('div');
    card.classList = "shadow-lg rounded bg-slate-200 p-4 h-[450px]";

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
        <img onclick="addfavarit('${image}')" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt="Like Icon" class="w-6 h-6 cursor-pointer" />
        <button onclick="displayinterval()" class="btn text-[#0E7A81]">Adopt</button>
        <button onclick="displayModal('${petId}')" class="btn text-[#0E7A81]">Details</button>
      </div>
    `;
    cardContainer2.appendChild(card);
  });
};

const displayModal = async (id1) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id1}`);
  const data = await res.json();

  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box space-y-2">
        <img class="w-full" src="${data.petData.image}">
        <div class="space-y-2">
          <h1 class="text-5xl font-bold">${data.petData.pet_name}</h1>
          <div class="flex gap-10">
          <div>
            <p>Breed: ${data.petData.breed}</p>
            <p>Gender: ${data.petData.gender}</p>
            <p>Status: ${data.petData.vaccinated_status}</p>
          </div>
           <div>
            <p>Birth: ${data.petData.date_of_birth}</p>
            <p>Price: ${data.petData.price}</p>
           </div>
          </div>
          <div>${data.petData.pet_details}</div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;

       my_modal_1.showModal();
};



// ...............................................setinterval......................................... 

const displayinterval = () => {
  // First clear the modal container

  const intervalContainer = document.getElementById("intervalContainer");
  intervalContainer.innerHTML = `
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box flex flex-col justify-center text-center w-72">
       
        <img class="" src="https://image.shutterstock.com/image-vector/fireworks-celebration-background-winner-victory-150nw-458132410.jpg">
        <h1 class="py-4 text-2xl font-bold text-red-600">congratulation</h1>
      </div>
  
    </dialog>

  `;

  // Show the modal
  const modal = document.getElementById("my_modal_3");
  modal.showModal();

  // Automatically close modal after 3 seconds
  setTimeout(() => {
    modal.close();
  }, 2000);
};

const addfavarit = (image) =>{
  const images = image
  const addimageContainer = document.getElementById("addimageContainer")
  addimageContainer.classList.remove("hidden")
    const div = document.createElement("span")
    div.classList=" h-auto  ml-5"
    div.innerHTML=`
    
   <img  src="${images}">
   
    `
    addimageContainer.appendChild(div)

  console.log('THIS IS FAVARIT', images)
}

const displaplaydisandingorder = (data) => {
  if (!data || !data.length) return;

  const sortedData = [...data].sort((a, b) => Number(b.price) - Number(a.price));

  displayAllData(sortedData);
};


// ...............................................setinterval......................................... 

// Show spinner and load all data after delay
document.getElementById('spinner').classList.remove("hidden");
setTimeout(() => {
  loadAllData();
}, 3000);

// Load categories on page load
Allcatagore();
