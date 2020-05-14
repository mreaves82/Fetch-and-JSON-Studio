// TODO: add code here
window.addEventListener("load", function() {
    function getSortOrder(hoursInSpace) {
        return function(currentValue, nextValue) {

            if (currentValue[hoursInSpace] > nextValue[hoursInSpace]) {
                return -1;
            }
            else if (currentValue[hoursInSpace] < nextValue[hoursInSpace]) {
                return 1;
            }
            return 0;
        };
    }
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        json.sort(getSortOrder('hoursInSpace'));
        const container = document.getElementById('container');
        let count = 0;
        let people = "";
        for (let person of json) {
            console.log(count);
            count += 1;
            let liGreen = "";
            if (person.active) {
                liGreen = 'style = "color:green;"';
            }

            people += `<div class="astronaut">
            <div class="bio">
               <h3>${person.firstName} ${person.lastName}</h3>
               <ul>
                  <li>Hours in space: ${person.hoursInSpace}</li>
                  <li ${liGreen}>Active: ${person.active}</li>
                  <li>Skills:${person.skills.join(", ")}</li >
               </ul >
            </div >
                <img class="avatar" src="${person.picture}">
         </div>`;

        };
        people = `<h2>Number of Astronauts: ${count}</h2>` + people;
        container.innerHTML = people;
    });
});
