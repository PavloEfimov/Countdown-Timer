let list = {};
let showList = {};
let main = document.querySelector("main");

let inputDiv = document.querySelector("#inputDiv");
let eventName = document.querySelector("#eventName");
let eventDate = document.querySelector("#eventDate");
let eventTime = document.querySelector("#eventTime");
let btnStart = document.querySelector("#btnStart");
let btnSave = document.querySelector("#btnSave");

let showDiv = document.querySelector("#showDiv");
let showName = document.querySelector("#showName");
let showDateTime = document.querySelector("#showDateTime");
let showDate = document.querySelector("#showDate");
let showTime = document.querySelector("#showTime");
let divider = document.querySelector("#divider");
let renderDiv = document.querySelector("#renderDiv");

let timer = document.querySelector("#timer");
let timerID;

let renderList = function () {
  renderDiv.textContent = "";
  for (let key in list) {
    let itemDiv = document.createElement("div");
    let itemNameDiv = document.createElement("div");
    itemNameDiv.textContent = `${key}`;
    itemDiv.append(itemNameDiv);
    let itemDataDiv = document.createElement("div");
    itemDataDiv.textContent = `${list[key][0]}    ${list[key][1]}`;
    itemDiv.append(itemDataDiv);
    let btnDiv = document.createElement("div");
    let btnInput = document.createElement("input");
    btnInput.type = "button";
    btnInput.value = "start";
    btnDiv.append(btnInput);
    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "delete";
    btnDiv.append(btnDelete);

    itemDiv.append(btnDiv);
    itemDiv.style.border = `1px solid black`;
    renderDiv.append(itemDiv);
  }
};

let fnCheck = function () {
  if (eventName.value == "") {
    alert(" event name is blank!");
    return true;
  }
  if (eventDate.value == "") {
    alert(" field DATE is blank!");
    return true;
  }

  if (eventTime.value == "") {
    eventTime.value = "12:00";
  }

  let dateNow = new Date();
  let datePlan = new Date(
    eventDate.value.slice(0, 4),
    eventDate.value.slice(5, 7) - 1,
    eventDate.value.slice(8, 10),
    eventTime.value.slice(0, 2),
    eventTime.value.slice(3, 5)
  );

  if (datePlan.getTime() < dateNow.getTime()) {
    alert(`TIME can\`t be before NOW`);

    return true;
  }

  if (datePlan.getFullYear() > dateNow.getFullYear() + 3) {
    alert(`YEAR can\`t be after ${dateNow.getFullYear() + 3}`);
    return true;
  }
};

let renderShowList = function (list) {
  showDiv.textContent = "";
  for (let key in list) {
    console.log("item", key, list[key]);
    let divUnitRender = document.createElement("div");
    let divUnitshowName = document.createElement("div");
    let divUnitshowDateTime = document.createElement("div");
    let timer = document.createElement("div");
    let spanShowDate = document.createElement("span");
    let spanDivider = document.createElement("span");
    let spanShowTime = document.createElement("span");
    divUnitRender.classList.add("showDivUnit");
    divUnitshowName.classList.add("showName");
    divUnitshowDateTime.classList.add("showDateTime");
    spanShowDate.classList.add("showDate");
    spanDivider.classList.add("divider");
    spanShowTime.classList.add("showTime");
    divUnitRender.append(divUnitshowName);
    divUnitRender.append(divUnitshowDateTime);
    divUnitRender.append(timer);
    divUnitshowDateTime.append(spanShowDate);
    divUnitshowDateTime.append(spanDivider);
    divUnitshowDateTime.append(spanShowTime);
    divUnitRender.style.border = `1px solid black`;
    showDiv.append(divUnitRender);

    divUnitshowName.textContent = key;
    spanShowDate.textContent = list[key][0];
    spanShowTime.textContent = list[key][1];
    spanDivider.textContent = " _>>>_ ";

    datePlan = new Date(
      spanShowDate.textContent.slice(0, 4),
      spanShowDate.textContent.slice(5, 7) - 1,
      spanShowDate.textContent.slice(8, 10),
      spanShowTime.textContent.slice(0, 2),
      spanShowTime.textContent.slice(3, 5)
    );

    let currentTime = new Date();

    let counterTime = datePlan.getTime() - currentTime.getTime();

    let counterDays = Math.floor(counterTime / (24 * 60 * 60 * 1000));
    if (counterDays < 0) counterDays = 0;
    let counterHours = Math.floor(
      (counterTime - counterDays * (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    if (counterHours < 0) counterHours = 0;
    let counterMinutes = Math.floor(
      (counterTime -
        counterDays * (24 * 60 * 60 * 1000) -
        counterHours * (60 * 60 * 1000)) /
        (60 * 1000)
    );
    if (counterMinutes < 0) counterMinutes = 0;
    let counterSeconds = Math.floor(
      (counterTime -
        counterDays * (24 * 60 * 60 * 1000) -
        counterHours * (60 * 60 * 1000) -
        counterMinutes * (60 * 1000)) /
        1000
    );
    if (counterSeconds < 0) {
      counterSeconds = 0;
      showName.textContent = "";
      showDate.textContent = "";
      showTime.textContent = "";
      divider.textContent = "";
      timer.textContent = `it\`s right time for the event: ${key}`;
      timer.style.color = "green";
      timer.style.fontWeight = "bold";
    } else {
      timer.textContent = `${counterDays} days: ${counterHours} hours: ${counterMinutes} minutes: ${counterSeconds} seconds`;
    }
  }
};

let fnTimer = function (e) {
  if (e.target.value !== "delete") {
    let datePlan;

    if (fnCheck()) {
      return;
    }

    list[eventName.value] = [eventDate.value, eventTime.value];

    renderList();

    if (e.target.value == "Start") {
      showList[eventName.value] = list[eventName.value];
      renderShowList(showList);

      datePlan = new Date(
        eventDate.value.slice(0, 4),
        eventDate.value.slice(5, 7) - 1,
        eventDate.value.slice(8, 10),
        eventTime.value.slice(0, 2),
        eventTime.value.slice(3, 5)
      );
    } else if (e.target.value == "start") {
      showDiv.innerHTML = "";
      let showName = e.target.parentNode.parentNode.children[0].textContent;
      showList[showName] = list[showName];
      renderShowList(showList);

      let content = e.target.parentNode.parentNode.children[1].textContent;
      datePlan = new Date(
        content.slice(0, 4),
        content.slice(5, 7) - 1,
        content.slice(8, 10),
        content.slice(14, 16),
        content.slice(17, 19)
      );
    }

    let fnShowTimer = function () {
      renderShowList(showList);
    };
    timerID = setInterval(fnShowTimer, 1000);
  }
};

let fnSave = function (e) {
  if (fnCheck()) return;
  list[eventName.value] = [eventDate.value, eventTime.value];

  renderList();
};

let fnDelete = function (e) {
  if (e.target.value == "delete") {
    console.log(e.target.parentNode.parentNode.children[0].textContent);
    let delName = e.target.parentNode.parentNode.children[0].textContent;

    delete list[delName];
    delete showList[delName]
    renderList();
    renderShowList(showList);
  }
};

btnStart.addEventListener("click", fnTimer);
renderDiv.addEventListener("click", fnTimer);
btnSave.addEventListener("click", fnSave);
renderDiv.addEventListener("click", fnDelete);
