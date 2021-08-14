const taskContainer = document.querySelector(".task__container");

let globalTaskData = [];

const generateHTML = (taskData) => {
    return ` <div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
<div class="card">
  <div class="card-header gap-2 d-flex justify-content-end">
    <button class="btn btn-outline-info" name=${taskData.id} onclick="editCard.apply(this, arguments)" >
      <i class="fal fa-pencil" name=${taskData.id}></i>
    </button>
    <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
      <i class="far fa-trash-alt" name=${taskData.id}></i>
    </button>
  </div>
  <div class="card-body">
    <img
      src="${taskData.image}"
      alt="image"
      class="card-img"
      id="imgg"
    />
    <h5 class="card-title mt-4">${taskData.title}</h5>
    <p class="card-text">
      ${taskData.description}
    </p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary" name=${taskData.id}>Open Task</button>
  </div>
</div>
</div>`;

}

const addNewCard = () => {

    //get Task Data
    const taskData = {
        id: `${Date.now()}`, //number to string formate
        image: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };

    globalTaskData.push(taskData);

    //update the localStroage
    localStorage.setItem("taskYY", JSON.stringify({ cards: globalTaskData }));

    //Task container
    const newCard = generateHTML(taskData);

    //Inject it to Dom
    taskContainer.insertAdjacentHTML("beforeend", newCard)

    //clear the form
    document.getElementById("imageURL").value = "";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("taskDescription").value = "";
};


const loadExistingCard = () => {

    //check localstrage
    const getData = localStorage.getItem("taskYY");

    //parse JSON data,if exit
    if (!getData) return; //null-false
    const taskCard = JSON.parse(getData);

    globalTaskData = taskCard.cards;

    globalTaskData.map((taskData) => {
        //generate HTML code for those data
        const newCard = generateHTML(taskData);

        //insert into DOM
        taskContainer.insertAdjacentHTML("beforeend", newCard);
    });

    return;
}

const deleteCard = (event) => {

    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetID); //if condition true, then save
    globalTaskData = removeTask;

    //update the localStroage
    localStorage.setItem("taskYY", JSON.stringify({ cards: globalTaskData }));

    //Access DOM to remove card
    if (elementType === "BUTTON") {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    } else {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode.parentNode
        );
    }

};