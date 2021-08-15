const taskContainer = document.querySelector(".task__container");
const taskModal = document.querySelector(".task__modal__body");

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
      src=${taskData.image}
      alt="image"
      class="card-img"
    />
    <h5 class="card-title mt-4">${taskData.title}</h5>
    <p class="card-text">
      ${taskData.description}
    </p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary" name=${taskData.id} data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask.apply(this, arguments)">Open Task</button>
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


const editCard = (event) => {
    const elementType = event.target.tagName;

    let taskTitle;
    let taskType;
    let taskDescription;
    let parentElement;
    let submitButton;

    if (elementType === "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else {
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentElement.childNodes[3].childNodes[3];
    taskDescription = parentElement.childNodes[3].childNodes[5];
    taskType = parentElement.childNodes[3].childNodes[7];
    submitButton = parentElement.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.innerHTML = "Save Changes";
};


const saveEdit = (event) => {

    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    let parentElement;

    if (elementType === "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else {
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    const taskTitle = parentElement.childNodes[3].childNodes[3];
    const taskDescription = parentElement.childNodes[3].childNodes[5];
    const taskType = parentElement.childNodes[3].childNodes[7];
    const submitButton = parentElement.childNodes[5].childNodes[1];

    const updatedData = {
        title: taskTitle.innerHTML,
        type: taskType.innerHTML,
        description: taskDescription.innerHTML,
    };

    //console.log({ updatedData, targetID });

    const updateGlobalTasks = globalTaskData.map((task) => {
        if (task.id === targetID) {
            //console.log({...task, ...updatedData });
            return {...task, ...updatedData };
        }
        return task;
    });

    globalTaskData = updateGlobalTasks;

    localStorage.setItem("taskYY", JSON.stringify({ cards: globalTaskData }));

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
    submitButton.innerHTML = "Open Task";

};

const htmlModalContent = ({ description, id, image, title }) => {
        const date = new Date(parseInt(id));
        return ` 
        <div id=${id}>
        <img
  src=${
    image ||
    `https://images.unsplash.com/photo-1572214350916-571eac7bfced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80`
  }
  alt="bg image"
  id="place__holder__image"
  class="img-fluid mb-3"
  />
        <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">
          ${description}
        </p></div>
        `;
};

const openTask = (event) => {
  const targetID = event.target.getAttribute("name");
  //console.log(targetID);

  const getTask = globalTaskData.filter((task) => task.id === targetID);
  console.log(getTask[0]);

  taskModal.innerHTML = htmlModalContent(getTask[0]);

}