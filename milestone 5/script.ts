// Get DOM elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareable = document.getElementById('shareable') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

if (!form) {
    console.error("Form element not found.");
}
if (!resumeDisplayElement) {
    console.error("Resume display element not found.");
}

// Handle form submission
form?.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Generate resume content dynamically
    const resumeContent = `
        <h2>${name}'s Resume</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;

    // Display resume
    resumeDisplayElement.innerHTML = resumeContent;

    // Store the resume in localStorage for shareable link
    const resumeData = { name, email, phone, education, experience, skills };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate a unique shareable link
    const link = `${window.location.origin}/?username=${username}`;
    shareableLinkElement.href = link;
    shareableLinkElement.textContent = link;
    shareable.style.display = 'block';
});

// Handle PDF download
downloadPdfButton?.addEventListener('click', () => {
    const doc = new jsPDF();
    doc.html(resumeDisplayElement, {
        callback: (doc) => {
            doc.save('resume.pdf');
        }
    });
});
