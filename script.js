let currentDraggedItem;
const tierInput = document.getElementById("tier");

const itemContainers = document.getElementsByClassName("item-container");

const submitbtn = document.getElementById("submit");
const imageForm = document.getElementById("image-form");

for(const itemContainer of itemContainers){
    setUpItemContainerForDrag(itemContainer);
}

imageForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const imageItemInput = document.getElementById("image-item");
    if(imageItemInput.value === ""){
        alert("Please enter the image url");
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = "";
})

submitbtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const target = event.target;
    if(tierInput.value === ""){
        alert("Please enter a tier name");
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = "";
})

function createTierList(tierListName){
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier-list");

    const heading = document.createElement("div");
    heading.classList.add("heading");

    const textContainer = document.createElement("div");
    textContainer.textContent = tierListName;

    heading.appendChild(textContainer);

    const newTierListItems = document.createElement("div");
    newTierListItems.classList.add("tier-list-items");

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById("tier-list-section");
    tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl){
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("draggable", "true");
    imageDiv.classList.add("item-container");

    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src = imageUrl;

    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById("non-tier-section");
    nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener("dragstart", (event)=>{
        console.log(event);
        currentDraggedItem = event.target.parentNode;
    })

    itemContainer.addEventListener("dblclick", (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById("non-tier-section");
        nonTierSection.appendChild(parentNode);
    })
}

function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener("drop", (event)=>{
        event.preventDefault();
    })

    tierListItem.addEventListener("dragover", function(event){
        if(this !== currentDraggedItem.parentNode){
            this.appendChild(currentDraggedItem);
        }
    })
}