document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map').setView([-33.9249, 18.4241], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const locations = {
            'constantia': { coords: [-34.0255, 18.4480], name: 'Constantia Emporium' },
            'muizenberg': { coords: [-34.1091, 18.4716], name: 'Muizenberg' },
            'panorama': { coords: [-33.8750, 18.5750], name: 'Panorama' },
            'sanlam': { coords: [-33.9215, 18.4265], name: 'Sanlam' },
            'newlands': { coords: [-33.9750, 18.4650], name: 'Newlands' }
        };

        const markers = {};
        for (const key in locations) {
            const loc = locations[key];
            markers[key] = L.marker(loc.coords).addTo(map);
            markers[key].bindPopup(`<b>Knead Bakery</b><br>${loc.name}`);
        }

        window.focusLocation = function(locationKey) {
            const loc = locations[locationKey];
            if (loc) {
                map.flyTo(loc.coords, 15, { duration: 1.5 });
                markers[locationKey].openPopup();
            }
        };
    }

    const form = document.getElementById("enquiryForm");
    const messageDiv = document.getElementById("form-message");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); 
            messageDiv.style.display = "none";
            messageDiv.innerHTML = "";

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value.trim();
            const consent = document.getElementById("consent").checked;

            let errors = [];

            if (name === "") errors.push("Please enter your full name.");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
            if (phone !== "") {
                const phonePattern = /^[0-9\s\-\+]{10,15}$/;
                if (!phonePattern.test(phone)) errors.push("Please enter a valid phone number.");
            }
            if (subject === "") errors.push("Please select a type of enquiry.");
            if (message.length < 10) errors.push("Your message must be at least 10 characters long.");
            if (!consent) errors.push("You must agree to be contacted.");

            if (errors.length > 0) {
                messageDiv.style.display = "block";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.innerHTML = errors.join("<br>");
            } else {
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    messageDiv.style.display = "block";
                    messageDiv.style.backgroundColor = "#d4edda";
                    messageDiv.style.color = "#155724";
                    messageDiv.innerHTML = "Thank you, " + name + "! Your enquiry has been sent successfully.";
                    form.reset();
                    submitBtn.textContent = "Send Enquiry";
                    submitBtn.disabled = false;
                    setTimeout(() => { messageDiv.style.display = "none"; }, 5000);
                }, 1500);
            }
        });
    }

    const accordionHeaders = document.querySelectorAll(".accordion-header");

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener("click", function() {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                content.classList.toggle("open");
                
                if (content.classList.contains("open")) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }
});
