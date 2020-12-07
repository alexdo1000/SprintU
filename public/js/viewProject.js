window.onload = () => {

    function clickHandler(){ // declare a function that updates the state
        document.getElementById('memberList').classList.toggle("is-active");
    }

    var memberButton = document.getElementById('memberListButton');
    memberButton.addEventListener('click', clickHandler); // associate the function above with the click event
}