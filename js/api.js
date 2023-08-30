const loadPhone = async (searchText = 'samsung', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // ShowAll 
    const showAllButton = document.getElementById('show-all');
    // show all button if there are more than 12 items
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden')
    }

    // display 12 items if !isShowAll
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card bg-base-100 shadow-xl";
        phoneCard.innerHTML = `
        <div class="mx-auto my-10 w-72 h-72 flex justify-center items-center bg-[#FF38380D] rounded-xl">
            <img src="${phone.image}" class=""/>
        </div>

        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="text-center py-2 text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button id="show-details-handler" onclick="showDetailsHandler('${phone.slug}')" class="btn bg-red-600 text-white font-medium hover:bg-blue-500">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}


// Search Functionality //

// SearchHandler
const searchHandler = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}
const toggleLoadingSpinner = (isLoading) => {
    const searchLoadingSpinner = document.getElementById('result-loading');
    if (isLoading) {
        searchLoadingSpinner.classList.remove('hidden');
    } else {
        searchLoadingSpinner.classList.add('hidden');
    }
}

const showAllHandler = () => {
    searchHandler(true);
}

// show details handler
const showDetailsHandler = async (id) => {
    console.log('details btn clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    showDetailsContainer(phone);
}

const showDetailsContainer = (phone) => {
    const detailsContainer = document.getElementById('showDetailsModal')
    detailsContainer.innerHTML = `
         <form method="dialog" class="modal-box h-full text-left">
                <div class="mx-auto h-60 flex justify-center items-center bg-[#FF38380D] rounded-xl">
                    <img src="${phone.image}" class="" />
                </div>
                    <h3 class="font-bold text-xl pt-2">${phone.name}</h3>
                    <p class="pt-2 text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <h3 class="font-medium text-sm my-1">Brand : <span class="text-[#706F6F]">${phone.brand}</span></h3>
                    <h3 class="font-medium text-sm my-1">Storage : <span class="text-[#706F6F]">${phone.mainFeatures.storage}</span></h3>
                    <h3 class="font-medium text-sm my-1">Display Size : <span class="text-[#706F6F]">${phone.mainFeatures.displaySize}</span></h3>
                    <h3 class="font-medium text-sm my-1">Chipset : <span class="text-[#706F6F]">${phone.mainFeatures.chipSet}</span></h3>
                    <h3 class="font-medium text-sm my-1">Memory : <span class="text-[#706F6F]">${phone.mainFeatures.memory}</span></h3>
                    <h3 class="font-medium text-sm my-1">Release data : <span class="text-[#706F6F]">${phone?.releaseDate}</span></h3>
                    <h3 class="font-medium text-sm my-1">GPS : <span class="text-[#706F6F]">${phone?.others?.GPS || 'No GPS'}</span></h3>
                <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn bg-red-600 px-10 text-white font-medium hover:bg-blue-500">Close</button>
                </div>
         </form>
            `
    showDetailsModal.showModal();
}



loadPhone()