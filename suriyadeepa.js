document.addEventListener("DOMContentLoaded", function () {
    const storage = localStorage;

    // Login page
    const loginForm = document.querySelector(".login-form");
    const passwordInput = document.getElementById("password");

    if (loginForm && passwordInput && !document.getElementById("successModal")) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert("Please enter your email and password.");
                return;
            }

            if (email === "deepa@gmail.com" && password === "1234") {
                storage.setItem("loggedIn", "true");
                storage.setItem("loginEmail", email);
                alert("Login successful! Welcome to Campus Connect.");
                window.location.href = "homepage.html";
            } else {
                alert("Invalid email or password.\n\nDemo Login:\nEmail: deepa@gmail.com\nPassword: 1234");
            }
        });
    }

    // Student registration page
    const studentRegisterForm = document.querySelector("form.login-form");
    const firstNameInput = document.getElementById("fname");
    const studentDepartment = document.getElementById("department");

    if (studentRegisterForm && firstNameInput && studentDepartment && !document.getElementById("type")) {
        const modal = document.getElementById("successModal");
        const closeButton = document.getElementById("closeModalBtn");

        studentRegisterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!studentRegisterForm.checkValidity()) {
                studentRegisterForm.reportValidity();
                return;
            }

            const formData = new FormData(studentRegisterForm);
            const student = Object.fromEntries(formData.entries());
            storage.setItem("name", `${student.firstName} ${student.lastName}`.trim());
            storage.setItem("email", student.email || "");
            storage.setItem("phone", student.phone || "");
            storage.setItem("department", student.department || "");
            storage.setItem("year", student.year || "");

            if (modal) {
                modal.classList.add("visible");
            } else {
                alert("Registration successful!");
                window.location.href = "login.html";
            }
        });

        if (closeButton && modal) {
            closeButton.addEventListener("click", function () {
                window.location.href = "login.html";
            });
        }
    }

    // Event and course registration page
    const registrationForm = document.getElementById("regForm");

    if (registrationForm) {
        const modal = document.getElementById("successModal");
        const closeButton = document.getElementById("closeModalBtn");

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!registrationForm.checkValidity()) {
                registrationForm.reportValidity();
                return;
            }

            const formData = new FormData(registrationForm);
            const registration = Object.fromEntries(formData.entries());
            registration.date = new Date().toLocaleString();

            const registrations = JSON.parse(storage.getItem("registrations") || "[]");
            registrations.push(registration);
            storage.setItem("registrations", JSON.stringify(registrations));
            storage.setItem("email", registration.email || "");
            storage.setItem("phone", registration.phone || "");

            if (modal) {
                modal.classList.add("visible");
            } else {
                alert("Registration successful!");
                window.location.href = "event.html";
            }
        });

        if (closeButton && modal) {
            closeButton.addEventListener("click", function () {
                window.location.href = "event.html";
            });

            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    window.location.href = "event.html";
                }
            });
        }
    }

    // Edit profile page
    const editProfileForm = document.getElementById("editProfileForm");

    if (editProfileForm) {
        const fields = ["name", "email", "phone", "regNo", "year", "department"];
        const defaults = {
            name: "suriya deepa",
            email: "deepa@gmail.com",
            phone: "9363510511",
            regNo: "23BCA001",
            year: "III Year",
            department: "B.Sc Computer Science"
        };

        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (input) input.value = storage.getItem(field) || defaults[field];
        });

        editProfileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            fields.forEach(function (field) {
                const input = document.getElementById(field);
                if (input) storage.setItem(field, input.value.trim());
            });

            alert("Profile updated successfully!");
            window.location.href = "profilepage.html";
        });
    }

    // Profile page
    const profileFields = {
        profileName: ["name", "suriya deepa"],
        profileRegNo: ["regNo", "23BCA001"],
        profileDepartment: ["department", "B.Sc Computer Science"],
        profileYear: ["year", "III Year"],
        profileEmail: ["email", "deepa@gmail.com"],
        profilePhone: ["phone", "9363510511"]
    };

    Object.keys(profileFields).forEach(function (elementId) {
        const element = document.getElementById(elementId);
        const data = profileFields[elementId];
        if (element) element.textContent = storage.getItem(data[0]) || data[1];
    });

    // Profile photo upload
    const photoInput = document.getElementById("photoInput");
    const profileImage = document.getElementById("profileImg");

    if (photoInput && profileImage) {
        const savedPhoto = storage.getItem("profilePhotoUrl");
        if (savedPhoto) profileImage.src = savedPhoto;

        photoInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                photoInput.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onload = function () {
                profileImage.src = reader.result;
                try {
                    storage.setItem("profilePhotoUrl", reader.result);
                } catch (error) {
                    alert("Image is too large to save.");
                }
            };
            reader.readAsDataURL(file);
        });
    }

    // Logout buttons
    document.querySelectorAll(".logout-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            if (confirm("Are you sure you want to logout?")) {
                storage.removeItem("loggedIn");
                storage.removeItem("loginEmail");
                alert("Logged out successfully!");
                window.location.href = "login.html";
            }
        });
    });
});
