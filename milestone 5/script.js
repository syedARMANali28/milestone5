"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import html2pdf library
var html2pdf_js_1 = require("html2pdf.js");
// Get DOM elements
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
if (!form)
    console.error("Form element not found.");
if (!resumeDisplayElement)
    console.error("Resume display element not found.");
// Handle form submission
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Validate username to ensure it's unique
    if (!username) {
        alert("Username is required.");
        return;
    }
    // Generate resume content dynamically
    var resumeData = "\n        <h2>".concat(name, "'s Resume</h2>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <h3>Education</h3>\n        <p>").concat(education, "</p>\n        <h3>Experience</h3>\n        <p>").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(skills, "</p>\n    ");
    resumeDisplayElement.innerHTML = resumeData;
    // Save data to localStorage
    localStorage.setItem(username, JSON.stringify({ name: name, email: email, phone: phone, education: education, experience: experience, skills: skills }));
    // Generate a unique shareable link
    var shareableLink = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareableLinkElement.href = shareableLink;
    shareableLinkElement.textContent = shareableLink;
    // Display shareable link and download button
    shareableLinkContainer.style.display = "block";
});
// Handle PDF download
downloadPdfButton.addEventListener("click", function () {
    if (!resumeDisplayElement)
        return;
    var options = {
        margin: 1,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    (0, html2pdf_js_1.default)().from(resumeDisplayElement).set(options).save();
});
// Handle shareable link loading
document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResume = localStorage.getItem(username);
        if (savedResume) {
            var _a = JSON.parse(savedResume), name_1 = _a.name, email = _a.email, phone = _a.phone, education = _a.education, experience = _a.experience, skills = _a.skills;
            var resumeData = "\n                <h2>".concat(name_1, "'s Resume</h2>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n                <h3>Experience</h3>\n                <p>").concat(experience, "</p>\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n            ");
            resumeDisplayElement.innerHTML = resumeData;
        }
        else {
            alert("No resume found for this username.");
        }
    }
});
