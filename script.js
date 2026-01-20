let problems = JSON.parse(localStorage.getItem("problems")) || [];

function addProblem() {
    let name = document.getElementById("problem").value;
    let topic = document.getElementById("topic").value;
    let level = document.getElementById("level").value;

    if(name === "") return alert("Enter problem name");

    problems.push({ name, topic, level, solved: false });
    localStorage.setItem("problems", JSON.stringify(problems));
    document.getElementById("problem").value = "";
    render();
}

function toggleSolved(i) {
    problems[i].solved = !problems[i].solved;
    localStorage.setItem("problems", JSON.stringify(problems));
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    problems.forEach((p, i) => {
        list.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.topic}</td>
            <td>${p.level}</td>
            <td>
                <button class="${p.solved ? 'solved' : ''}"
                onclick="toggleSolved(${i})">
                ${p.solved ? 'Solved ✅' : 'Mark Solved'}
                </button>
            </td>
        </tr>`;
    });
}

render();


function applyFilter() {
    let topic = document.getElementById('filterTopic').value;
    let level = document.getElementById('filterLevel').value;

    let filtered = problems.filter(p => 
        (topic === 'All' || p.topic === topic) &&
        (level === 'All' || p.level === level)
    );

    let list = document.getElementById("list");
    list.innerHTML = "";
    filtered.forEach((p, i) => {
        list.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.topic}</td>
            <td>${p.level}</td>
            <td>
                <button class="${p.solved ? 'solved' : ''}"
                onclick="toggleSolved(${i})">
                ${p.solved ? 'Solved ✅' : 'Mark Solved'}
                </button>
            </td>
        </tr>`;
    });

    updateChart(filtered); // chart update with filtered data
}
