const openModalBtn = document.getElementById('openModal');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


function calculateCGPA() {
    const numSemesters = parseInt(document.getElementById('num-semesters').value);
    const sgpas = document.querySelectorAll('.sgpa-input');
    const credits = document.querySelectorAll('.sgpa-credits');
    let totalCredits = 0;
    let totalPoints = 0;
    let valid = true;  
    for (let i = 0; i < numSemesters; i++) {
        const sgpa = parseFloat(sgpas[i].value);
        const semesterCredits = parseFloat(credits[i].value);

        if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
            valid = false;
            sgpas[i].style.borderColor = 'red'; 
        } else {
            sgpas[i].style.borderColor = '';  
        }

        if (!isNaN(semesterCredits) && semesterCredits > 0) {
            totalCredits += semesterCredits;
            totalPoints += sgpa * semesterCredits;
        }
    }

    if (valid && totalCredits > 0) {
        const cgpa = totalPoints / totalCredits;
        document.getElementById('cgpa-result').textContent = `CGPA: ${cgpa.toFixed(2)}`;
    } else if (!valid) {
        document.getElementById('cgpa-result').textContent = 'Please enter valid SGPA values (0 to 10).';
    } else {
        document.getElementById('cgpa-result').textContent = 'Total credits must be greater than 0.';
    }
}

function generateSemesterInputs() {
    const numSemesters = parseInt(document.getElementById('num-semesters').value);
    const container = document.getElementById('semesters-inputs');
    container.innerHTML = '';

    for (let i = 0; i < numSemesters; i++) {
        const inputSGPA = document.createElement('input');
        inputSGPA.type = 'number';
        inputSGPA.className = 'sgpa-input';
        inputSGPA.placeholder = `SGPA of Semester ${i + 1}`;
        inputSGPA.max = 10;  

        const inputCredits = document.createElement('input');
        inputCredits.type = 'number';
        inputCredits.className = 'sgpa-credits';
        inputCredits.placeholder = `Credits of Semester ${i + 1}`;
        inputCredits.min = 0;  

        container.appendChild(inputSGPA);
        container.appendChild(inputCredits);
        container.appendChild(document.createElement('br'));
    }
}

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const newTransformValue = -currentSlide * 100;
    document.querySelector('.carousel-wrapper').style.transform = `translateX(${newTransformValue}%)`;
}
