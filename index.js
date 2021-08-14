const taskContainer = document.querySelector(".task__container");


const addNewCard = () => {

    //get Task Data
    const taskData = {
        id: `${Date.now()}`,
        image: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };


    //Task container
    const newCard =
        ` <div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
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

    //Inject it to Dom
    taskContainer.insertAdjacentHTML("beforeend", newCard)

    //clear the form
    document.getElementById("imageURL").value = "";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("taskDescription").value = "";
};