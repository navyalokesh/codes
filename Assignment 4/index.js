// Event Listeners for add a card button
let addCardEvent = document.querySelector(".add");
addCardEvent.addEventListener("click", displayAddPopup);

// event listener for closing add popup
let closePopupEvent = document.querySelector(".popup-close");
closePopupEvent.addEventListener("click", closeAddPopup);

// event listener for add a new list popup
let addListEvent = document.querySelector("#addBtnforList");
addListEvent.addEventListener("click", addNewSubList);

// event listener for closing adding a new list popup
let closeListEvent = document.querySelector(".closeBtn")
closeListEvent.addEventListener("click" , closeAddNewList);

// event listner for add button inside the card
let addNewCardEvent = document.querySelector("#addBtnForCard");
addNewCardEvent.addEventListener("click", addNewCard);


// empty array to hold array of objects (array of cards)
let cardArr = []; 

let addSubListContext;
        let addSubListParentContext;

// function to add a new card

function addNewCard(){
        console.log("add button is clicked");
        let input = document.querySelector(".heading-field").value ;
        // if(input == "")
        // {
        //    alert("please provide the title for the card")
        //     return;
        // }
        // creating  a new card with id and heading
        const addCard = {
            id: Date.now(),
            heading : input,
            subList : []
        }

        // adding the new card into the empty array
        cardArr.push(addCard);
        console.log(cardArr);
        // closing the add a new card popup
        closeAddPopup();
        // displaying the newly added card
        display([addCard]);    

}

// function to display add a new card popup
    function displayAddPopup (){
        // accessing dynamic card element
        let accessNewCard  = document.querySelector(".newcard-popup");
        accessNewCard.style.display="block";

        // accessing the main container to make the background  blur
        let hideIt = document.querySelector("#blur-main");
        hideIt.classList.toggle("active");

    }



// function to close 'add a new card popup'
    function closeAddPopup(){
        let pop = document.querySelector(".newcard-popup");
        pop.style.display = "none";
        
        // accessing the main container to make the background not blur
        let hideIt = document.querySelector("#blur-main");
        hideIt.classList = " ";
    }


    // function to display add list popup
    function displayNewListPopup(context) {
            
        // accessing sublist popup
        let list = document.querySelector(".newitem-popup");
        list.style.display ="block";
         // accessing the main container to make the background not blur
             let hideIt = document.querySelector("#blur-main");
             hideIt.classList.toggle("active");

              addSubListContext = context.parentNode.parentNode.parentNode.parentNode.getAttribute("id_card");
             addSubListParentContext = context.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    }




    // function to add a new list inside the card

         function addNewSubList () {

        // accessing input field of the list popup

        let subInputField = document.querySelector(".input-field").value;
        // if(subInputField == " "){

        //    alert("please enter the title");
        //     return;
        // }

        const subArray = {
            id: Date.now(),
            subListName : subInputField
        }
        
        
        for(let i=0;i <cardArr.length; i++){
            if(addSubListContext == cardArr[i].id){
                // adding sublist into sublist array
                cardArr[i].subList.push(subArray);
                // passing the item to display function
                let subIndex = cardArr[i].subList.length-1;
                let newListLi = document.createElement("li");
                
                newListLi.innerHTML = cardArr[i].subList[subIndex].subListName + " "+ `<a class="strike" onclick="strikeThrough(this)"> Mark Done </a>`;
                addSubListParentContext.append(newListLi);
            }
        }

        closeAddNewList();

    }

    

    
        // function to close add list popup

        function closeAddNewList() {

            // accessing sublist popup
            let list = document.querySelector(".newitem-popup");
            list.style.display ="none";

             // accessing the main container to make the background not blur
             let hideIt = document.querySelector("#blur-main");
             hideIt.classList=" ";

        }


// function to display the cards

    function display(cardArr){
        
        //hiding the empty message
        if(cardArr.length){
                let noMessage = document.querySelector(".empty-message");
                noMessage.style.display = "none";
        }
        
        // looping through the array of cards
        for(let i =0 ; i< cardArr.length ; i++){

        
            // creating a dynamic element 
            
            const newDiv = document.createElement('div');
            // adding the styling
            newDiv.classList.add(".card-style", "card-content" ,"card-content-title","sub-card","sub-card-ol","content-add-icon","card-op","card-add");
            // setting the attribute of the card with the id which we created
            newDiv.setAttribute("id_card" , cardArr[i].id);
            newDiv.innerHTML = `<div class= "card-content">
                                    <p class="title"> ${cardArr[i].heading}</p>
                                    <hr class="card-content-horizontal">
                                    <div class="sub-card">
                                    <ol class = "sub-card-ol">
                                    </ol>
                                    </div>
                                    <div class="card-op">
                                        <div class="card-add">
                                        <i style="font-size:30px;color:blue;" class="fas fa-trash-alt" onclick="deleteCard(this)"></i>
                                        <i style="font-size:30px;color:red;" onclick="displayNewListPopup(this)" class="add-list-sub content-add-icon fas fa-plus-circle"></i>
                                        </div>
                                    </div>
                                </div>`

                // accessing the empty div element in html
                let dymCard = document.querySelector(".cards");
                dymCard.append(newDiv);

                let subCardLength = cardArr[i].subList.length;
                let cardId = newDiv.getAttribute("id_card");
                // looping through sub list
                for(let j=0; j <subCardLength; j++)
                {
                    let newLi = document.createElement("li");
                    
                    newLi.innerHTML = cardArr[i].subList[j].subListName + " " + `<a class="strike" onclick="strikeThrough(this)"> Mark Done </a>`;
                    newDiv.childNodes[1].childNodes[5].childNodes[1].append(newLi); 
                }
            }

    }

    display(cardArr);

    // function to strike through when task is completed
        function strikeThrough(listContent){
            listContent.parentNode.style.textDecoration = "line-through";
        }

    // function to delete the card
        function deleteCard(cardRemove){
            cardRemove.parentNode.parentNode.parentNode.parentNode.remove();
        }
