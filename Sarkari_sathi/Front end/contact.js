
    let districtData = [];

    async function loadDistricts() {
        try {
            // This tries to grab your file
            const response = await fetch('nepal_continfo.json');
            if (!response.ok) throw new Error("Could not find the JSON file!");
            
            const json = await response.json();
            districtData = json.data;
            
            const select = document.getElementById('districtSelect');
            districtData.forEach(item => {
                let opt = document.createElement('option');
                opt.value = item.district;
                opt.innerHTML = item.district;
                select.appendChild(opt);
            });
            console.log("Districts loaded successfully!");
        } catch (err) {
            console.error("Error:", err.message);
            alert("The contact list failed to load. Make sure the JSON file is in the right folder!");
        }
    }

    function showContactInfo() {
        const selectedDistrict = document.getElementById('districtSelect').value;
        const resultArea = document.getElementById('contactResult');
        
        const info = districtData.find(d => d.district === selectedDistrict);
        if (info) {
            document.getElementById('daoName').innerText = "DAO Office, " + info.district;
            document.getElementById('daoPhone').innerText = info.mobile;
            document.getElementById('daoEmail').innerText = info.email;
            resultArea.style.display = 'block';
        }
    }

    // This tells the computer: "Run this as soon as the window opens"
    window.onload = loadDistricts;
